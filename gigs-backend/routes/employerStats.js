const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/employerStats/employer/stats
router.get('/employer/stats', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id; // or req.user.userId if that's what's in your token

  try {
    const [[{ activeListings }]] = await pool.execute(
      "SELECT COUNT(*) AS activeListings FROM jobs WHERE employerId = ? AND status = 'open'",
      [employerId]
    );

    const [[{ pendingApprovals }]] = await pool.execute(
      "SELECT COUNT(*) AS pendingApprovals FROM jobs WHERE employerId = ? AND status = 'pending'",
      [employerId]
    );

    const [[{ totalApplications }]] = await pool.execute(
      `SELECT COUNT(*) AS totalApplications
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE j.employerId = ?`,
      [employerId]
    );

    res.json({ activeListings, pendingApprovals, totalApplications });
  } catch (err) {
    console.error("Error fetching employer stats:", err);
    res.status(500).json({ error: "Could not retrieve dashboard stats" });
  }
});

module.exports = router;
