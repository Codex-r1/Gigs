const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/admin/applications', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.id, a.appliedAt, a.status, u.firstName, u.lastName, j.title AS jobTitle
      FROM applications a
      JOIN users u ON a.applicantId = u.id
      JOIN jobs j ON a.job_id = j.jobId
      ORDER BY a.appliedAt DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching admin applications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
