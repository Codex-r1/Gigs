const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/admin/users', authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT id, firstName, lastName, email, role FROM users
      ORDER BY created_at DESC
      LIMIT 100
    `);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
