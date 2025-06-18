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

  const employerId = req.user?.id;
  console.log("EMPLOYER ID:", employerId); // Check if token has userId
  console.log("BODY:", req.body);           // Check request structure

  if (!title || !description || !location || !category) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const query = `
    INSERT INTO jobs (employerId, title, description, location, category, status, postedAt)
    VALUES (?, ?, ?, ?, ?, 'open', NOW())
  `;

  pool.query(query, [employerId, title, description, location, category], (err, result) => {
    if (err) {
      console.error("DB INSERT ERROR:", err);
      return res.status(500).json({ error: "Server error while posting job." });
    }
    res.status(201).json({ message: "Job posted successfully", job_id: result.insertId });
  });
});


// GET /api/jobs
router.get('/jobs', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Jobs ORDER BY posted_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

module.exports = router;
