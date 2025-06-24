const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// PUT /api/applications/:id/status
router.put('/:id/status', authenticateToken, authorizeRoles('employer'), async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE Applications SET status = ? WHERE id = ?`,
      [status, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    res.json({ message: `Application ${status} successfully.` });
  } catch (err) {
    console.error('Error updating application status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
