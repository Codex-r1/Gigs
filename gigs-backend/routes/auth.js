const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); // mysql2/promise pool
require('dotenv').config();

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const sql = 'INSERT INTO Users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)';
    const values = [firstName, lastName, email, hashedPassword, role];

    const [result] = await pool.execute(sql, values);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT userId, email, password, role FROM Users WHERE email = ?',
      [email]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Profile Route
router.get('/profile', async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT firstName, lastName, email, role FROM Users WHERE userId = ?',
      [userId]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  // If using JWT, there's no session to destroy.
  res.json({ message: 'Logout successful' });
});

module.exports = router;
