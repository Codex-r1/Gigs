const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST / (relative to /api/jobs from server.js, so becomes /api/jobs)
router.post('/', authenticateToken, async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    salary,
    skill
  } = req.body;

  const employerId = req.user?.userId;

  console.log("EMPLOYER ID (from token):", employerId);
  console.log("Request Body:", req.body);

  // Nullish coalescing to avoid undefined errors
  const safeTitle = title ?? null;
  const safeDescription = description ?? null;
  const safeLocation = location ?? null;
  const safeCategory = category ?? null;
  const safeSalary = salary ?? null;
  const safeSkill = skill ?? null;
  const safeEmployerId = employerId ?? null;

  // Check for missing required values
  if (
    !safeTitle ||
    !safeDescription ||
    !safeLocation ||
    !safeCategory ||
    safeSalary === null ||
    safeSkill === null ||
    !safeEmployerId
  ) {
    return res.status(400).json({ error: "All required job fields must be filled." });
  }

  try {
    const query = `
      INSERT INTO jobs (employerId, title, description, location, category, salary, skill, postedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'open', NOW())
    `;
    const values = [safeEmployerId, safeTitle, safeDescription, safeLocation, safeCategory, safeSalary, safeSkill];

    const [result] = await pool.execute(query, values);

    res.status(201).json({ message: "Job posted successfully", job_id: result.insertId });
  } catch (err) {
    console.error("DB INSERT ERROR (POST /api/jobs):", err);
    res.status(500).json({ error: "Server error while posting job: " + err.message });
  }
});



// GET / (relative to /api/jobs from server.js, so becomes /api/jobs)
router.get('/', async (req, res) => { // Changed '/jobs' to '/'
  try {
    const [rows] = await pool.execute('SELECT * FROM Jobs ORDER BY posted_at DESC');
    res.json(rows);
  } catch (err) {
    console.error("DB FETCH ERROR (GET /api/jobs):", err);
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});
router.get('/employer/applicants', authenticateToken, async (req, res) => {
  const employerId = req.user.userId;

  try {
    const [rows] = await pool.execute(`
      SELECT a.applicationId, u.firstName, u.lastName, j.title AS jobTitle, a.appliedAt, a.status AS applicationStatus
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