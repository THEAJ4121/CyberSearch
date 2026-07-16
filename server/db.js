const mysql = require('mysql2/promise');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ── TiDB Cloud Enterprise TLS Enforcement ──
// We forcefully parse the string evaluation. 'True ', 'TRUE', 'true' all gracefully succeed.
const isSSL = String(process.env.DB_SSL).trim().toLowerCase() === 'true';

let sslConfig = undefined;

if (isSSL) {
  sslConfig = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true // NEVER set this false on production
  };

  // Enterprise Zero-Trust Execution:
  // Officially recommended by TiDB node.js documentation.
  // It physically reads a trusted CA bundle preventing Man-in-the-Middle attacks.
  try {
    const caPath = path.join(__dirname, 'tidb-ca.pem');
    if (fs.existsSync(caPath)) {
      sslConfig.ca = fs.readFileSync(caPath);
      logger.info('TiDB CA Certificate correctly loaded into memory buffer.');
    }
  } catch (err) {
    logger.warn(`Failed to load tidb-ca.pem. Proceeding with default OS Certificate Authorities. Error: ${err.message}`);
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'cybersearch',
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '4000', 10),
  ssl: sslConfig, // Dynamic security injection
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true, 
  keepAliveInitialDelay: 10000,
});

/**
 * Enterprise Query Helper
 */
async function query(sql, params) {
  const start = Date.now();
  try {
    const [results, fields] = await pool.query(sql, params);
    const duration = Date.now() - start;
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
