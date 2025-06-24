const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/applications
router.post('/', authenticateToken, async (req, res) => {
  const applicantId = req.user.id;
  const { jobId } = req.body;

  if (!jobId || !applicantId) {
    return res.status(400).json({ error: "Missing job or applicant ID" });
  }

  try {
    await pool.query(
      "INSERT INTO Applications (jobId, applicantId, status, appliedAt) VALUES (?, ?, 'pending', NOW())",
      [jobId, applicantId]
    );
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ error: 'Failed to apply' });
  }
});

// GET /api/applications
router.get('/', authenticateToken, async (req, res) => {
  const applicantId = req.user.id; // or req.user.userId depending on your token payload

  try {
    const [rows] = await pool.query(
      `SELECT a.applicationId, a.status, a.appliedAt, 
              j.title, j.location, j.category
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE a.applicantId = ?`,
      [applicantId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Could not retrieve applications" });
  }
});
module.exports = router;
