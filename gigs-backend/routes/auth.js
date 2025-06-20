const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); // mysql2
const { authenticateToken } = require('../middleware/auth'); // <-- Notice the curly braces!
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
// After receiving JWT from backend
const decoded = JSON.parse(atob(token.split('.')[1]));
   

    res.json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
    
  }
});
// GET all jobs
router.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/profile
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const [rows] = await pool.execute(
      'SELECT firstName, lastName, email, phone, bio FROM Users WHERE userId = ?',
      [userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { firstName, lastName, email, phone, bio } = req.body;
  try {
    await pool.execute(
      'UPDATE Users SET firstName = ?, lastName = ?, email = ?, phone = ?, bio = ? WHERE userId = ?',
      [firstName, lastName, email, phone, bio, userId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

// PUT /api/auth/update-password
router.put('/update-password', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const [rows] = await pool.execute('SELECT password FROM Users WHERE userId = ?', [userId]);
    const user = rows[0];

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE Users SET password = ? WHERE userId = ?', [hashedPassword, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
});

// DELETE /api/auth/delete-account
router.delete('/delete-account', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    await pool.execute('DELETE FROM Users WHERE userId = ?', [userId]);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account', error: err.message });
  }
});

module.exports = router;
