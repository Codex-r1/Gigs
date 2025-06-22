const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/bookmarks
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.body;

  if (!jobId) return res.status(400).json({ error: "Job ID required" });

  try {
    const [rows] = await pool.query(
      'INSERT IGNORE INTO bookmarks (userId, jobId) VALUES (?, ?)',
      [userId, jobId]
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
      SELECT jobs.jobId, jobs.title, jobs.category, jobs.location
      FROM bookmarks
      JOIN jobs ON bookmarks.jobId = jobs.jobId
      WHERE bookmarks.userId = ?
      ORDER BY bookmarks.bookmarked_at DESC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch bookmarks:", err);
    res.status(500).json({ error: "Could not fetch bookmarked jobs" });
  }
});

module.exports = router;
