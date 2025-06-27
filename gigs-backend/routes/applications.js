const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken  } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/auth');

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
// GET /api/applications/:id/employer-contact
router.get('/:id/employer-contact', authenticateToken, async (req, res) => {
  const applicationId = req.params.id;
  const applicantId = req.user.id;

  try {
    const [rows] = await pool.query(`
      SELECT 
  ep.businessName,
  ep.phone,
  ep.location,
  u.email
FROM Applications a
JOIN Jobs j ON a.jobId = j.jobId
JOIN Users u ON j.employerId = u.userId
JOIN employer_profiles ep ON ep.userId = u.userId
WHERE a.applicationId = ? AND a.applicantId = ? AND a.status = 'accepted'
    `, [applicationId, applicantId]);

    if (rows.length === 0) {
      return res.status(403).json({ error: 'No contact info found or application not accepted.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Contact info fetch error:", error);
    res.status(500).json({ error: 'Server error while fetching employer contact.' });
  }
});

router.delete('/:applicationId', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const [result] = await pool.query(
      'DELETE FROM Applications WHERE applicationId = ?',
      [applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    res.json({ message: 'Applicant removed successfully.' });
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Server error while removing application.' });
  }
});


module.exports = router;
