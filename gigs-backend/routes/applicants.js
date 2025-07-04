// routes/applicants.js
const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth");
// GET /api/applicants/:id - Get single applicant profile
router.get('/:id', async (req, res) => {
  if (!req.params.id || req.params.id === 'undefined') {
    return res.status(400).json({ error: 'Applicant ID is required' });
  }
  const id = { userId: req.params.id };
  try {
    const [rows] = await pool.query(`
      SELECT u.userId, u.firstName, u.lastName, u.email, p.bio
      FROM users u
      JOIN profiles p ON u.userId = p.userId
      WHERE u.userId = ?
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: "Applicant not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching applicant:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
