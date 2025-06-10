const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Apply for a job
router.post('/apply', async (req, res) => {
  const { jobId, applicantId } = req.body;

  if (!jobId || !applicantId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const sql = `
      INSERT INTO Applications (jobId, applicantId)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [jobId, applicantId]);

    res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  } catch (err) {
    console.error('Application error:', err.message);
    res.status(500).json({ message: 'Failed to apply for the job' });
  }
});

// Get applications by user (for applicants)
router.get('/user/:applicantId', async (req, res) => {
  const { applicantId } = req.params;

  try {
    const [applications] = await pool.execute(
      `SELECT a.*, j.title, j.company FROM Applications a
       JOIN Jobs j ON a.jobId = j.jobId
       WHERE a.applicantId = ?`,
      [applicantId]
    );

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// (Optional) Get all applications for a job (for employers)
router.get('/job/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const [applications] = await pool.execute(
      `SELECT a.*, u.firstName, u.lastName FROM Applications a
       JOIN Users u ON a.applicantId = u.userId
       WHERE a.jobId = ?`,
      [jobId]
    );

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job applications' });
  }
});

module.exports = router;
