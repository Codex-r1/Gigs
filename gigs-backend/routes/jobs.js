const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/jobs
router.post('/', authenticateToken, async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    salary,
    skillsRequired
  } = req.body;

  const employerId = req.user.id;

  if (!title || !description || !location || !category || !salary || !skillsRequired || !employerId) {
    return res.status(400).json({ error: "All required job fields must be filled." });
  }

  try {
    const query = `
      INSERT INTO jobs (employerId, title, description, location, category, salary, skillsRequired, status, postedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'open', NOW())
    `;
    const values = [employerId, title, description, location, category, salary, skillsRequired];

    const [result] = await pool.execute(query, values);

    res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
  } catch (err) {
    console.error("DB INSERT ERROR (POST /api/jobs):", err);
    res.status(500).json({ error: "Server error while posting job: " + err.message });
  }
});

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM jobs ORDER BY postedAt DESC');
    res.json(rows);
  } catch (err) {
    console.error("DB FETCH ERROR (GET /api/jobs):", err);
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});

// GET /api/employer/applicants
router.get('/employer/applicants', authenticateToken, async (req, res) => {
  const employerId = req.user.id;

  try {
    const [rows] = await pool.execute(`
      SELECT a.applicationId, a.applicantId, u.firstName, u.lastName, u.email, j.title AS jobTitle, a.appliedAt AS appliedDate, a.status
      FROM Applications a
      JOIN Users u ON a.applicantId = u.userId
      JOIN Jobs j ON a.jobId = j.jobId
      WHERE j.employerId = ?
      ORDER BY a.appliedAt DESC
    `, [employerId]);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching applicants (GET /api/employer/applicants):", err);
    res.status(500).json({ error: "Server error while retrieving applicants: " + err.message });
  }
});

module.exports = router;
