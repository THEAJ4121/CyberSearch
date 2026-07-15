const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cyberpunk_default_development_secret_key_99';

/**
 * Middleware: Verify Authorization token structure
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'ACCESS TERMINATED: Missing decryption token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'ACCESS FORBIDDEN: Invalid/Expired session key.' });
    }
    req.user = decoded;
    next();
  });
}

/**
 * @route POST /api/auth/register
 * @desc  Securely registers a new console node operator
 */
router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing parameters. Protocol demands username, email, and password.' });
  }

  try {
    // Check if operator credentials exist
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'CONFLICT DETECTED: Username or email already registered on database.' });
    }

    // Securely hash secret passwords
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert to DB
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, 'user']
    );

    const insertedId = result.insertId;

    // Generate session JWT
    const token = jwt.sign(
      { id: insertedId, email, username, role: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Node initialized successfully.',
      token,
      user: { id: insertedId, username, email, role: 'user' }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route POST /api/auth/login
 * @desc  Authenticates connection credentials
 */
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing parameters. Provide both console email and decryption password.' });
  }

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'INVALID AUTHENTICATION: Credentials not matching.' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'INVALID AUTHENTICATION: Credentials not matching.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Authentication session valid.',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route GET /api/auth/me
 * @desc  Verifies operator token and returns current session info
 */
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'OPERATOR NOT FOUND: Session references invalid node.' });
    }

    res.status(200).json({ user: users[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
  authenticateToken,
};
