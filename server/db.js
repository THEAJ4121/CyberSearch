const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool configured with production-ready options
// The environment variables will be injected by Railway / Render in deployment
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cybersearch',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10, // Avoid database fatigue in small cloud databases
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

// Immediately test connection during init
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ CONNECTED TO DATABASE POOL SUCCESSFULLY');
    connection.release();
  } catch (err) {
    console.error('❌ DATABASE CONNECTION POOL ERROR:', err.message);
  }
})();

module.exports = pool;
