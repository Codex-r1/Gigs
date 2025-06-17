const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/applications
router.post('/applications', authenticateToken, (req, res) => {
  const applicant_id = req.user.userId;
  const { job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  const query = `
  INSERT INTO Applications (job_id, applicantId, status, appliedAt)
  VALUES (?, ?, 'pending', NOW())
`;


  pool.query(query, [job_id, applicant_id], (err, result) => {
    if (err) {
      console.error("Application error:", err);
      return res.status(500).json({ error: "Could not apply for job" });
    }

    res.status(201).json({ message: "Application submitted successfully" });
  });
});
// routes/applications.js
router.get('/applications', authenticateToken, (req, res) => {
  const applicantId = req.user.userId;

  const query = `
    SELECT a.applicationId, a.status, a.appliedAt, j.title, j.description, j.location, j.category
    FROM Applications a
    JOIN Jobs j ON a.jobId = j.jobId
    WHERE a.applicantId = ?
    ORDER BY a.appliedAt DESC
  `;

  pool.query(query, [applicantId], (err, results) => {
    if (err) {
      console.error("Fetch applications error:", err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
    res.json(results);
  });
});

module.exports = router;
