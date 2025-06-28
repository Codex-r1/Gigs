const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { authorizeRoles } = require("../middleware/auth");
// GET /api/profiless/me 
router.get("/me", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [[profiless]] = await pool.query(
      `SELECT users.firstName, users.lastName, users.email, users.role, 
              profiles.bio, profiles.skills, profiles.location
       FROM users
       LEFT JOIN profiles ON users.userId = profiles.userId
       WHERE users.userId = ?`,
      [userId]
    );

    if (!profiless) {
      return res.status(404).json({ error: "profiles not found" });
    }

    res.json(profiless);
  } catch (err) {
    console.error("Error fetching profiless:", err);
    res.status(500).json({ error: "Server error while fetching profiles" });
  }
});

// PUT /api/profiless/me — update user info and profiless
router.put("/me", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, bio, skills, location } = req.body;

  try {
    await pool.query(
      `UPDATE users SET firstName = ?, lastName = ? WHERE userId = ?`,
      [firstName, lastName, userId]
    );

    const [existing] = await pool.query(`SELECT * FROM profiles WHERE userId = ?`, [userId]);

    if (existing.length > 0) {
      await pool.query(
        `UPDATE profiles SET bio = ?, skills = ?, location = ? WHERE userId = ?`,
        [bio, skills, location, userId]
      );
    } else {
      await pool.query(
        `INSERT INTO profiles (userId, bio, skills, location) VALUES (?, ?, ?, ?)`,
        [userId, bio, skills, location]
      );
    }

    res.json({ message: "profiles updated successfully." });
  } catch (err) {
    console.error("Error updating profiles:", err);
    res.status(500).json({ error: "Server error while updating profiless" });
  }
});

// PUT /api/profiless/password — change user password
router.put("/password", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const [[user]] = await pool.query(`SELECT password FROM users WHERE userId = ?`, [userId]);
    if (!user) return res.status(404).json({ error: "User not found." });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ error: "Current password is incorrect." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(`UPDATE users SET password = ? WHERE userId = ?`, [hashedPassword, userId]);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ error: "Server error while changing password." });
  }
});

// DELETE /api/profiless/me — delete user account
router.delete("/me", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.query(`DELETE FROM users WHERE userId = ?`, [userId]);
    // If you set ON DELETE CASCADE on profiless.userId foreign key, it will auto-delete profiless.
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Server error while deleting account." });
  }
});
// GET /api/applicants/:id
router.get("/applicants/:id", authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const { id } = req.params;
  const [[profiles]] = await pool.query(`
    SELECT users.firstName, users.lastName, users.email, profiles.bio, profiles.skills, profiles.location
    FROM users
    LEFT JOIN profiles ON users.userId = profiles.userId
    WHERE users.userId = ? AND users.role = 'applicant'`,
    [id]
  );
  if (!profiles) return res.status(404).json({ error: "Applicant not found" });
  res.json(profiles);
});


module.exports = router;
