// routes/ratings.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// POST /api/ratings — Submit a new rating
router.post('/', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const employerId = req.user.userId;
  const { applicantId, score, feedback } = req.body;

  if (!applicantId || !score || score < 1 || score > 5) {
    return res.status(400).json({ error: 'Applicant ID and valid score (1–5) are required.' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM ratings WHERE employerId = ? AND applicantId = ?',
      [employerId, applicantId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'You have already rated this applicant.' });
    }

    await pool.query(
      'INSERT INTO ratings (employerId, applicantId, score, feedback) VALUES (?, ?, ?, ?)',
      [employerId, applicantId, score, feedback]
    );

    res.status(201).json({ message: 'Rating submitted successfully.' });
  } catch (err) {
    console.error('Error submitting rating:', err);
    res.status(500).json({ error: 'Failed to submit rating.' });
  }
});

// GET /api/ratings/:applicantId — Get all ratings for a specific applicant
router.get('/:applicantId', async (req, res) => {
  const { applicantId } = req.params;

  try {
    const [ratings] = await pool.query(
      'SELECT score, feedback, createdAt FROM ratings WHERE applicantId = ?',
      [applicantId]
    );

    res.json(ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings.' });
  }
});

module.exports = router;
