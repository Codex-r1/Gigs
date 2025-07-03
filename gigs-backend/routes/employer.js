const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/applicants', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id;

  try {
    const [rows] = await pool.query(`
      SELECT 
        a.applicationId, a.status, a.appliedAt, a.message,
        j.skillsRequired,
        u.userId AS applicantId, u.firstName, u.lastName, u.email,
        j.title AS jobTitle,
        p.skills AS applicantSkills
      FROM Applications a
      JOIN Users u ON a.applicantId = u.userId
      JOIN Jobs j ON a.jobId = j.jobId
      JOIN Profiles p ON u.userId = p.userId
      WHERE j.employerId = ?
      ORDER BY a.appliedAt DESC
    `, [employerId]);

    // Calculate skill match %
    const processedRows = rows.map(app => {
      const jobSkills = (app.skillsRequired || "").toLowerCase().split(',').map(s => s.trim());
      const userSkills = (app.applicantSkills || "").toLowerCase().split(',').map(s => s.trim());

      const matches = jobSkills.filter(skill => userSkills.includes(skill));
      const matchPercent = jobSkills.length > 0 ? Math.round((matches.length / jobSkills.length) * 100) : 0;

      return {
        ...app,
        skillMatchPercent: matchPercent
      };
    });

    res.json(processedRows);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: "Could not fetch applicants" });
  }
});
module.exports = router;