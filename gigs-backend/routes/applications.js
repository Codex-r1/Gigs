const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// POST /api/applications
router.post('/', authenticateToken, authorizeRoles("applicant"), async (req, res) => {
  const { jobId, motivation } = req.body;
  const applicantId = req.user.id;

  if (!jobId || !motivation) {
    return res.status(400).json({ error: "Job ID and motivation are required." });
  }

  try {
    // Check if job exists and is open
    const [[job]] = await pool.execute("SELECT * FROM Jobs WHERE jobId = ?", [jobId]);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.status === 'closed') {
      return res.status(400).json({ message: "This job is already closed." });
    }

    // Get job skillsRequired
    const jobSkills = job.skillsRequired ? job.skillsRequired.split(",").map(s => s.trim().toLowerCase()) : [];

    // Get applicant profile skills
    const [[profile]] = await pool.execute("SELECT skills FROM Profiles WHERE userId = ?", [applicantId]);
    const applicantSkills = profile?.skills ? profile.skills.split(",").map(s => s.trim().toLowerCase()) : [];

    // Calculate match %
    const matchedSkills = applicantSkills.filter(skill => jobSkills.includes(skill));
    const matchPercent = jobSkills.length ? Math.round((matchedSkills.length / jobSkills.length) * 100) : 0;

    // Insert application
    await pool.execute(`
      INSERT INTO Applications (jobId, applicantId, motivation, matchPercent, status, appliedAt)
      VALUES (?, ?, ?, ?, 'pending', NOW())
    `, [jobId, applicantId, motivation, matchPercent]);

    res.status(201).json({ message: "Application submitted", matchPercent });
  } catch (err) {
    console.error("Application error:", err);
    res.status(500).json({ error: "Failed to apply for job" });
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
