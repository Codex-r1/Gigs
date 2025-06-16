const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/jobs
router.post('/jobs', authenticateToken, (req, res) => {
  const {
    title,
    description,
    location,
    category,
  } = req.body;

  const employer_id = req.user.id; 

  if (!title || !description || !location || !category) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const query = `
    INSERT INTO jobs (employer_id, title, description, location, category, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'open', NOW())
  `;

  pool.query(
    query,
    [employer_id, title, description, location, category],
    (err, result) => {
      if (err) {
        console.error("Error inserting job:", err);
        return res.status(500).json({ error: "Server error while posting job." });
      }
      res.status(201).json({ message: "Job posted successfully", job_id: result.insertId });
    }
  );
});

module.exports = router;
