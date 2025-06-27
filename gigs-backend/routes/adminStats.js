// routes/adminStats.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/stats', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [[{ userCount }]] = await pool.query("SELECT COUNT(*) AS userCount FROM users");
    const [[{ jobCount }]] = await pool.query("SELECT COUNT(*) AS jobCount FROM jobs");
    const [[{ appCount }]] = await pool.query("SELECT COUNT(*) AS appCount FROM applications");

    res.json({ userCount, jobCount, appCount });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Server error retrieving stats." });
  }
});

module.exports = router;
