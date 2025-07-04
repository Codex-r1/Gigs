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

router.put('/update-status', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const { applicationId, status, reviewComment } = req.body;

  if (!applicationId || !status) {
    return res.status(400).json({ error: "Application ID and status are required" });
  }

  try {
    if (status === "rejected" && reviewComment) {
      await pool.query(
        'UPDATE Applications SET status = ?, reviewComment = ? WHERE applicationId = ?',
        [status, reviewComment, applicationId]
      );
    } else {
      await pool.query(
        'UPDATE Applications SET status = ? WHERE applicationId = ?',
        [status, applicationId]
      );
    }

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});


module.exports = router;