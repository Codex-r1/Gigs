const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/stats — platform statistics
router.get('/stats', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [[{ userCount }]] = await pool.query("SELECT COUNT(*) AS userCount FROM users");
    const [[{ jobCount }]] = await pool.query("SELECT COUNT(*) AS jobCount FROM jobs");
    const [[{ appCount }]] = await pool.query("SELECT COUNT(*) AS appCount FROM applications");

    res.json({ users: userCount, jobs: jobCount, applications: appCount });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/applications — recent applications
router.get('/admin/applications', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.applicationId, a.appliedAt, a.status, 
             u.firstName, u.lastName, 
             j.title AS jobTitle
      FROM applications a
      JOIN users u ON a.applicantId = u.userId
      JOIN jobs j ON a.jobId = j.jobId
      ORDER BY a.appliedAt DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/users — all users list
router.get('/admin/users', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT userId, firstName, lastName, email, role
      FROM users
      ORDER BY userId DESC
      LIMIT 100
    `);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// routes/admin.js
router.get('/admin/activity', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        DATE(postedAt) as date,
        COUNT(*) as count
      FROM jobs
      WHERE postedAt >= CURDATE() - INTERVAL 6 DAY
      GROUP BY DATE(postedAt)
      ORDER BY DATE(postedAt)
    `);

    res.json(rows); 
  } catch (err) {
    console.error("Error fetching activity chart data:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// PUT /api/admin/users/:id — Update a user
router.put('/admin/users/:userId', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, role } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE users SET firstName = ?, lastName = ?, email = ?, role = ? WHERE userId = ?`,
      [firstName, lastName, email, role, userId]
    );
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error while updating user.' });
  }
});

// DELETE /api/admin/users/:id — Delete a user
router.delete('/admin/users/:userId', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { userId } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM users WHERE userId = ?`, [userId]);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error while deleting user.' });
  }
});
// GET /api/admin/jobs - Fetch all jobs for Admin Dashboard
router.get("/admin/jobs", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [jobs] = await pool.query(`
      SELECT jobId, title, location, status, postedAt
      FROM jobs
      ORDER BY postedAt DESC
    `);

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs for admin:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
// DELETE /api/admin/jobs/:jobId
router.delete("/jobs/:jobId", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { jobId } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM jobs WHERE jobId = ?", [jobId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
