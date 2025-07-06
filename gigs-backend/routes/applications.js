const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// POST /api/applications
// POST /api/applications
router.post('/', authenticateToken, authorizeRoles('applicant'), async (req, res) => {
  const { jobId, motivation } = req.body;
  const applicantId = req.user.id;

  if (!jobId || !motivation || motivation.trim().length < 30) {
    return res.status(400).json({ error: "All fields are required and motivation must be meaningful." });
  }

  try {
    await pool.query(
      `INSERT INTO applications (applicantId, jobId, motivation, status) VALUES (?, ?, ?, 'pending')`,
      [applicantId, jobId, motivation]
    );
    res.status(201).json({ message: "Application submitted successfully." });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "You have already applied to this job." });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
  if (!motivation || motivation.trim().length < 30) {
  return res.status(400).json({ error: "Motivation must be at least 30 characters long." });
}

});



// GET /api/applications
router.get('/', authenticateToken, async (req, res) => {
  const applicantId = req.user.id;

  try {
    const [rows] = await pool.query(
      `SELECT Applications.applicationId, Applications.status, Applications.reviewComment, Applications.appliedAt, 
       Jobs.title, Jobs.location, Jobs.salary
FROM Applications
JOIN Jobs ON Applications.jobId = Jobs.jobId
WHERE Applications.applicantId = ?;
;
`,
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

// DELETE /api/applications/:applicationId
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
