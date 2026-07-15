const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const { router: authRouter } = require('./routes/auth');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── 1. SECURITY HEADERS (helmet) ──
// Helps secure Express apps by setting various HTTP headers
app.use(helmet());

// ── 2. COMPRESSION (compression) ──
// Decreases the size of the response body to increase serving speed
app.use(compression());

// ── 3. LOGGING (morgan) ──
// HTTP request logger. Use 'combined' format for standard Apache production logs, 'dev' for local testing.
if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Enable standard JSON/URLEncoded support
app.use(express.json({ limit: '10kb' })); // Restrict huge payloads (DOS protection)
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── 4. CORS (cross-origin resource sharing) ──
// Restrict incoming API requests to the allowed frontend domains
const allowedOrigins = [
  'http://localhost:5173', // Local Vite development
  process.env.FRONTEND_URL, // Production Vercel domain (injected in env)
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or curl requests (origin is undefined)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Access forbidden.'));
    }
  },
  credentials: true,
}));

// ── 5. RATE LIMITING (express-rate-limit) ──
// Limits repeated requests to public endpoints (e.g. login/register) to prevent brute-force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests generated from this IP. Session suspended for 15 minutes.'
  }
});
app.use('/api/', apiLimiter);

// ── 6. ROUTES ──
app.use('/api/auth', authRouter);

/**
 * @route GET /api/health
 * @desc  Verifies both express and SQL connection status
 */
app.get('/api/health', async (req, res) => {
  try {
    const start = Date.now();
    await pool.query('SELECT 1'); // Test active db query roundtrip
    const duration = Date.now() - start;

    res.status(200).json({
      status: 'UP',
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
      database: {
        status: 'CONNECTED',
        latency: `${duration}ms`
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'DEGRADED',
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
      database: {
        status: 'DISCONNECTED',
        error: err.message
      }
    });
  }
});

// Custom 404 Route for unsupported endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint terminal mismatch. Path not found.' });
});

// ── 7. GLOBAL ERROR HANDLING MIDDLEWARE ──
// Catches all synchronous/asynchronous controller faults
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('🔥 CRITICAL ERROR DECAY:', err.stack || err.message);

  const status = err.statusCode || 500;
  const message = NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message || 'Fatal system decay.';

  res.status(status).json({
    status: 'error',
    error: message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`📡 CYBERSEARCH CONSOLE ACTIVE ON PORT: ${PORT} [Mode: ${NODE_ENV}]`);
});
