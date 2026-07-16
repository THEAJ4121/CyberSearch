const mysql = require('mysql2/promise');
const logger = require('./utils/logger');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'cybersearch',
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 15, // Slightly higher for enterprise concurrency
  queueLimit: 0,
  enableKeepAlive: true,
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
    
    // Performance alerting for slow queries overhead
    if (duration > 200) {
      logger.warn(`SLOW QUERY DETECTED [${duration}ms]: ${sql.substring(0, 50)}...`);
    }
    
    return [results, fields]; // Match mysql2 array destructuring exactly
  } catch (err) {
    logger.error(`Query Execution Failed: ${err.message}`, err);
    throw err;
  }
}

module.exports = {
  pool,
  query
};
