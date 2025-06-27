// DELETE /api/auth/delete-account
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

router.delete('/delete-acc', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      'DELETE FROM users WHERE userId = ?',
      [userId]
      
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ error: 'Server error while deleting account.' });
  }
});

module.exports = router;
