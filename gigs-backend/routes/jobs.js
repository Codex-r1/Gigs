const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/auth');

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
// PATCH /api/jobs/:jobId/close - Close a job post
router.patch('/:jobId/close', authenticateToken, authorizeRoles('employer'), async (req, res) => {
  const { jobId } = req.params;
  const employerId = req.user.id;

  try {
    // Optional: verify that this job belongs to the employer
    const [job] = await pool.query('SELECT * FROM jobs WHERE jobId = ? AND employerId = ?', [jobId, employerId]);

    if (job.length === 0) {
      return res.status(404).json({ error: "Job not found or access denied" });
    }

    await pool.query('UPDATE jobs SET status = "closed" WHERE jobId = ?', [jobId]);
    res.json({ message: "Job closed successfully" });
  } catch (err) {
    console.error("Error closing job:", err);
    res.status(500).json({ error: "Failed to close job" });
  }
});
// PUT /api/jobs/:jobId
router.put('/:jobId', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id;
  const { jobId } = req.params;
  const { title, description, location, category, skillsRequired, status } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE jobs 
       SET title = ?, description = ?, location = ?, category = ?, skillsRequired = ?, status = ? 
       WHERE jobId = ? AND employerId = ?`,
      [title, description, location, category, skillsRequired, status, jobId, employerId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.json({ message: "Job updated successfully" });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE /api/jobs/:jobId
router.delete('/:id', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user.id;

  // Check if the job exists and belongs to the employer
  const [[job]] = await pool.query('SELECT * FROM Jobs WHERE jobId = ?', [jobId]);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.employerId !== employerId) {
    return res.status(403).json({ message: "Not authorized to delete this job." });
  }

  await pool.query('DELETE FROM Jobs WHERE jobId = ?', [jobId]);
  res.json({ message: "Job deleted successfully" });
});



module.exports = router;
