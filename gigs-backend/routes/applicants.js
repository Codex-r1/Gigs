// routes/applicants.js
const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

// GET /api/applicants/:id
router.get("/:id", authenticateToken, async (req, res) => {
  const applicantId = req.params.id;

  try {
    const [rows] = await pool.query(
      `SELECT firstName, lastName, email, bio, skills, location 
       FROM profiles
       JOIN Users ON users.userId = profiles.userId 
       WHERE Users.userId = ?`,
      [applicantId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching applicant profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
