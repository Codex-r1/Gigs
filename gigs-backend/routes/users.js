const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/users/me
router.get('/users/me', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  pool.query('SELECT firstName, lastName, email FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ error: 'Error retrieving profile' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(results[0]);
  });
});

module.exports = router;
