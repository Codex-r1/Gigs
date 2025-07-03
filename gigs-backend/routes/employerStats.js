const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/employerStats/employer/stats
router.get('/employer/stats', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id;

  try {
    const [[{ totalJobs }]] = await pool.execute(
      "SELECT COUNT(*) AS totalJobs FROM jobs WHERE employerId = ?",
      [employerId]
    );

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

    const [[{ newApplicationsToday }]] = await pool.execute(
      `SELECT COUNT(*) AS newApplicationsToday
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE j.employerId = ? AND DATE(a.appliedAt) = CURDATE()`,
      [employerId]
    );

    const [[{ newApplicationsMonth }]] = await pool.execute(
      `SELECT COUNT(*) AS newApplicationsMonth
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE j.employerId = ? AND MONTH(a.appliedAt) = MONTH(CURDATE()) AND YEAR(a.appliedAt) = YEAR(CURDATE())`,
      [employerId]
    );

    const [[{ interviewed }]] = await pool.execute(
      `SELECT COUNT(*) AS interviewed
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE j.employerId = ? AND a.status = 'interviewed'`,
      [employerId]
    );

    const [[{ hired }]] = await pool.execute(
      `SELECT COUNT(*) AS hired
       FROM applications a
       JOIN jobs j ON a.jobId = j.jobId
       WHERE j.employerId = ? AND a.status = 'accepted'`,
      [employerId]
    );

    res.json({
      totalJobs,
      activeListings,
      pendingApprovals,
      totalApplications,
      newApplicationsToday,
      newApplicationsMonth,
      interviewed,
      hired
    });

  } catch (err) {
    console.error("Error fetching employer stats:", err);
    res.status(500).json({ error: "Could not retrieve dashboard stats" });
  }
});

router.get('/trends', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id;

  try {
    const [rows] = await pool.execute(
      `
      SELECT 
        DATE_FORMAT(a.appliedAt, '%Y-%m-%d') AS date,
        COUNT(*) AS count
      FROM applications a
      JOIN jobs j ON a.jobId = j.jobId
      WHERE j.employerId = ?
        AND a.appliedAt >= CURDATE() - INTERVAL 30 DAY
      GROUP BY DATE(a.appliedAt)
      ORDER BY date ASC
      `,
      [employerId]
    );

    res.json(rows); // Array of { date, count }
  } catch (err) {
    console.error("Error fetching trend data:", err);
    res.status(500).json({ error: "Could not fetch trend data" });
  }
});

module.exports = router;
