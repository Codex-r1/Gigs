const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/auth/profile
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT bio, skills, location FROM profiles WHERE userId = ?',
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

  // Destructure fields safely, fallback to null if undefined
  const bio = req.body.bio ?? null;
  const skills = req.body.skills ?? null;
  const location = req.body.location ?? null;

  try {
    const [result] = await pool.query(
      `UPDATE profiles
       SET bio = ?, skills = ?, location = ?
       WHERE userId = ?`,
      [bio, skills, location, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

module.exports = router;
