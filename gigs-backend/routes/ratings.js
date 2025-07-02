const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');


// POST /api/ratings - Submit a rating
router.post('/', authenticateToken, authorizeRoles("employer"), async (req, res) => {
 console.log("req.user:", req.user); 
  const employerId = req.user.id;
  const { applicantId, feedback } = req.body;

  if (!applicantId || !feedback) {
    return res.status(400).json({ error: "Applicant ID and feedback are required" });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM ratings WHERE employerId = ? AND applicantId = ?',
      [employerId, applicantId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "You have already rated this applicant" });
    }

    await pool.query(
      'INSERT INTO ratings (employerId, applicantId, feedback) VALUES (?, ?, ?)',
      [employerId, applicantId, feedback]
    );

    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error("Error submitting rating:", err);
    res.status(500).json({ error: "Failed to submit rating" });
  }
});

// GET /api/ratings/applicant
router.get("/applicant", authenticateToken, authorizeRoles("applicant"), async (req, res) => {
  try {
    const [ratings] = await pool.query("SELECT * FROM ratings WHERE applicantId = ?", [req.user.id]);
    res.json(ratings);
  } catch (err) {
    console.error("Error fetching ratings:", err);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

module.exports = router;
