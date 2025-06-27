const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// PUT /api/admin/users/:id — update user
router.put('/users/:id', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Users SET firstName = ?, lastName = ?, email = ?, role = ? WHERE id = ?`,
      [firstName, lastName, email, role, id]
    );
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error while updating user.' });
  }
});

// DELETE /api/admin/users/:id — delete user
router.delete('/users/:id', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM Users WHERE id = ?`, [id]);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error while deleting user.' });
  }
});

module.exports = router;
