const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/auth/profile
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      `SELECT 
         u.firstName, u.lastName, u.email,
         p.bio, p.skills, p.location
       FROM users u
       LEFT JOIN profiles p ON u.userId = p.userId
       WHERE u.userId = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/auth/profile
router.put('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { bio = '', skills = '', location = '' } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE profiles
       SET bio = ?, skills = ?, location = ?
       WHERE userId = ?`,
      [bio, skills, location, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found for update' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

module.exports = router;
