const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST /api/ratings
router.post('/', authenticateToken, async (req, res) => {
  const employerId = req.user.id;
  const { applicantId, feedback } = req.body;

  if (!applicantId) {
    return res.status(400).json({ error: 'Applicant ID is required.' });
  }

  try {
    await pool.query(
      `INSERT INTO Ratings (employerId, applicantId, feedback)
       VALUES (?, ?, ?)`,
      [employerId, applicantId, feedback || null]
    );

    res.status(201).json({ message: 'Rating submitted successfully.' });
  } catch (err) {
    console.error('Error submitting rating:', err);
    res.status(500).json({ error: 'Server error while submitting rating.' });
  }
});

module.exports = router;
