const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/employer/applicants
router.get('/applicants', authenticateToken, authorizeRoles("employer"), async (req, res) => {
    const employerId = req.user.id;
  
    try {
      const [rows] = await pool.query(
        `SELECT 
  a.applicationId,
  a.applicantId,  
  u.firstName,
  u.lastName,
  j.title AS jobTitle,
  a.status
FROM Applications a
JOIN Jobs j ON a.jobId = j.jobId
JOIN Users u ON a.applicantId = u.userId
WHERE j.employerId = ?
`,
        [employerId]
      );
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      res.status(500).json({ error: "Could not fetch applicants" });
    }
  });
  // PUT /api/employer/update-status
router.put('/update-status', authenticateToken, authorizeRoles("employer"), async (req, res) => {
    const { applicationId, status } = req.body;
  
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
  
    try {
      const [result] = await pool.query(
        `UPDATE applications SET status = ? WHERE applicationId = ?`,
        [status, applicationId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Application not found" });
      }
  
      res.json({ message: "Status updated successfully" });
    } catch (err) {
      console.error("Error updating application status:", err);
      res.status(500).json({ error: "Could not update status" });
    }
  });
  
  module.exports = router;  