const mysql = require('mysql2/promise');
const logger = require('./utils/logger');
require('dotenv').config();

// ── TiDB Cloud Enterprise TLS Enforcement ──
// Serverless database distributed networks aggressively intercept open packets.
// Thus, executing without TLS minimums exposes vectors to man-in-the-middle attacks.
const sslConfig = process.env.DB_SSL === 'true' ? {
  minVersion: 'TLSv1.2',
  rejectUnauthorized: true
} : undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cybersearch',
  port: parseInt(process.env.DB_PORT || '4000', 10), // Adapted to TiDB standard port
  ssl: sslConfig, // Dynamic security injection
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true, // Prevents sudden socket deaths in serverless hibernation states
  keepAliveInitialDelay: 10000,
});

/**
 * Enterprise Query Helper
 * Standardizes stack traces and metrics across all controllers.
 */
async function query(sql, params) {
  const start = Date.now();
  try {
    const [results, fields] = await pool.query(sql, params);
    const duration = Date.now() - start;
    
    // Performance alerting for slow querying overhead natively tracking queries against TiKV
    if (duration > 200) {
      logger.warn(`SLOW QUERY DETECTED [${duration}ms]: ${sql.substring(0, 50)}...`);
    }
    
    return [results, fields];
  } catch (err) {
    logger.error(`Query Execution Failed: ${err.message}`, err);
    throw err;
  }
}

module.exports = {
  pool,
  query
};
