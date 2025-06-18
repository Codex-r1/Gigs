const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/bookmarks
router.post('/', authenticateToken, async (req, res) => {
  const user_id = req.user.userId;
  const { job_id } = req.body;

  if (!job_id) return res.status(400).json({ error: "Job ID required" });

  try {
    const [rows] = await pool.query(
      'INSERT IGNORE INTO bookmarks (user_id, job_id) VALUES (?, ?)',
      [user_id, job_id]
    );
    res.status(201).json({ message: "Job bookmarked" });
  } catch (err) {
    console.error("Bookmark error:", err);
    res.status(500).json({ error: "Failed to bookmark job" });
  }
});
// GET /api/bookmarks
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [rows] = await pool.query(`
      SELECT jobs.job_id, jobs.title, jobs.category, jobs.location
      FROM bookmarks
      JOIN jobs ON bookmarks.job_id = jobs.job_id
      WHERE bookmarks.user_id = ?
      ORDER BY bookmarks.bookmarked_at DESC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch bookmarks:", err);
    res.status(500).json({ error: "Could not fetch bookmarked jobs" });
  }
});

module.exports = router;
