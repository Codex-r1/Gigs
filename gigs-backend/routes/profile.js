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
router.put('/settings', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, email, bio, location } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "First name, last name, and email are required." });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Update Users table
    await conn.query(
      'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?',
      [firstName, lastName, email, userId]
    );

    // Update Profiles table
    await conn.query(
  'UPDATE profiles SET bio = ?, skills = ?, location = ? WHERE userId = ?',
  [bio, skills, location, userId]
);


    await conn.commit();
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    await conn.rollback();
    console.error("Error updating profile:", error);
    res.status(500).json({ error: 'Failed to update profile.' });
  } finally {
    conn.release();
  }
});

module.exports = router;
