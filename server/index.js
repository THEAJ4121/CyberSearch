const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const logger = require('./utils/logger');
const { pool } = require('./db');
const { runMigrations } = require('./database/migrate');
const { router: authRouter } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── 1. SECURITY & PERFORMANCE MIDDLEWARE ──
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});

app.use(helmet());
app.use(compression());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS strictly bound to frontend URL for CSRF protection
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Access forbidden.'));
    }
  },
  credentials: true,
}));

// DDoS Protection
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Custom Request Logger hook
app.use((req, res, next) => {
  if (NODE_ENV !== 'production' && req.path !== '/api/health') {
    logger.info(`[${req.method}] ${req.path} [ReqID: ${req.id.split('-')[0]}]`);
  }
  next();
});

// ── 2. MOUNT ROUTES ──
try {
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  logger.warn('Swagger specs unreadable. Skipping OpenApi route mapping.');
}

app.use('/api/auth', authRouter);

// ── 3. HEALTH ENDPOINT (Enterprise Level) ──
app.get('/api/health', async (req, res) => {
  try {
    const start = Date.now();
    await pool.query('SELECT 1');
    const dbLatency = Date.now() - start;
    const memory = process.memoryUsage();

    res.status(200).json({
      status: 'healthy',
      environment: NODE_ENV,
      version: '1.0.0',
      database: 'connected',
      migrations: app.locals.migrationStatus || 'unknown',
      uptime: process.uptime(),
      responseTime: `${dbLatency}ms`,
      memoryUsage: `${Math.round(memory.rss / 1024 / 1024)}mb (RSS)`,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    logger.error('Health Check Failed', err);
    res.status(503).json({ status: 'degraded', database: 'disconnected', error: err.message });
  }
});

// 404 Catcher
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint terminal mismatch. Path not found.' });
});

// ── 4. ERROR HANDLING ──
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(`Runtime Exception in route ${req.path}`, err);
  const status = err.statusCode || 500;
  res.status(status).json({
    status: 'error',
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// ── 5. APPLICATION LIFECYCLE ──
// Graceful shutdown handling for K8s / Render scaling
let server;

async function bootstrap() {
  try {
    const migrationResult = await runMigrations(pool);
    app.locals.migrationStatus = migrationResult.status;

    server = app.listen(PORT, () => {
      logger.startup({
        env: NODE_ENV,
        port: PORT,
        dbStatus: 'Connected pool',
        migrations: `Up to date (+${migrationResult.newlyApplied})`
      });
    });
  } catch (err) {
    logger.error('CRITICAL BOOT FAILURE. Application aborting.', err);
    process.exit(1);
  }
}

bootstrap();

// Process Event Traps (Graceful Exit)
const shutdown = async (signal) => {
  logger.warn(`Received ${signal}. Draining HTTP requests...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed. Terminating database active connections.');
      try {
        await pool.end();
        logger.success('Backend offline gracefully.');
        process.exit(0);
      } catch (err) {
        logger.error('Failed to close DB pool cleanly', err);
        process.exit(1);
      }
    });
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logger.error('UNHANDLED PROMISE REJECTION', reason);
});
