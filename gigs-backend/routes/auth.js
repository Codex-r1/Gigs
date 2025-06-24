const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
require('dotenv').config();


// ✅ REGISTER ROUTE
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const [result] = await pool.execute(
      'INSERT INTO Users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});


// ✅ LOGIN ROUTE
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

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    console.log("JWT_SECRET in login:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      userId: user.userId
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


// ✅ GET PROFILE
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.execute(
      `SELECT 
         u.firstName, u.lastName, u.email,
         p.bio, p.skills, p.location
       FROM Users u
       LEFT JOIN Profiles p ON u.userId = p.userid
       WHERE u.userId = ?`,
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});


// ✅ UPDATE PROFILE (Users + Profiles)
router.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {
    firstName = null,
    lastName = null,
    email = null,
    bio = null,
    skills = null,
    location = null
  } = req.body;

  try {
    // Update Users table
    await pool.execute(
      `UPDATE Users SET firstName = ?, lastName = ?, email = ?, WHERE userId = ?`,
      [firstName, lastName, email, userId]
    );

    // Update Profiles table
    await pool.execute(
      `UPDATE Profiles SET bio = ?, skills = ?, location = ? WHERE userid = ?`,
      [bio, skills, location, userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});


// ✅ UPDATE PASSWORD
router.put('/update-password', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required.' });
  }

  try {
    const [rows] = await pool.execute('SELECT password FROM Users WHERE userId = ?', [userId]);
    const user = rows[0];

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE Users SET password = ? WHERE userId = ?', [hashedPassword, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err.message);
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
});


// ✅ DELETE ACCOUNT
router.delete('/delete-account', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.execute('DELETE FROM Profiles WHERE userid = ?', [userId]); // optional cleanup
    await pool.execute('DELETE FROM Users WHERE userId = ?', [userId]);

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err.message);
    res.status(500).json({ message: 'Error deleting account', error: err.message });
  }
});


module.exports = router;
