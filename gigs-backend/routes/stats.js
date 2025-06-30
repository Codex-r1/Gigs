// routes/stats.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/stats/applicants
router.get('/applicants', authenticateToken, async (req, res) => {
  const userId = req.user.userId || req.user.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID missing from token' });
  }

  try {
    const [[{ applications }]] = await pool.query(
      'SELECT COUNT(*) AS applications FROM applications WHERE applicantId = ?',
      [userId]
    );

    const [[{ bookmarks }]] = await pool.query(
      'SELECT COUNT(*) AS bookmarks FROM bookmarks WHERE userId = ?',
      [userId]
    );

    res.json({ applications, bookmarks });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
