const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/ratings/applicant/:id - Get applicant details for rating
router.get('/applicant/:id', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const { id } = req.params;
  
  try {
    const [applicant] = await pool.query(
      'SELECT userId, firstName, lastName, email FROM users WHERE userId = ? AND role = "applicant"',
      [id]
    );
    
    if (applicant.length === 0) {
      return res.status(404).json({ error: "Applicant not found" });
    }
    
    res.json(applicant[0]);
  } catch (err) {
    console.error("Error fetching applicant:", err);
    res.status(500).json({ error: "Failed to fetch applicant details" });
  }
});

// POST /api/ratings - Submit a rating
router.post('/', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.id;
  const { applicantId, feedback, score, recommended } = req.body;

  if (!applicantId || !feedback || score === undefined || recommended === null) {
    return res.status(400).json({ error: "All fields (applicantId, feedback, score, recommended) are required" });
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
      'INSERT INTO ratings (employerId, applicantId, feedback, score, recommended) VALUES (?, ?, ?, ?, ?)',
      [employerId, applicantId, feedback, score, recommended]
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