// routes/stats.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/stats/youth
router.get('/youth', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [[{ applications }]] = await pool.query(
      'SELECT COUNT(*) AS applications FROM applications WHERE applicantId = ?',
      [userId]
    );

    const [[{ bookmarks }]] = await pool.query(
      'SELECT COUNT(*) AS bookmarks FROM bookmarks WHERE user_id = ?',
      [userId]
    );

    const [[{ views }]] = await pool.query(
      'SELECT views AS profileViews FROM profile_views WHERE user_id = ?',
      [userId]
    );

    res.json({ applications, bookmarks, profileViews: views || 0 });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
