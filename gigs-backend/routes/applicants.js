// routes/applicants.js
const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth");
// GET /api/employer/applicant-details/:applicantId/:jobId
router.get('/applicant-details/:applicantId/:jobId', authenticateToken, authorizeRoles("employer"), async (req, res) => {
  const { applicantId, jobId } = req.params;

  try {
    const [[profile]] = await pool.query("SELECT * FROM profiles WHERE userId = ?", [applicantId]);

    const [[application]] = await pool.query(
      "SELECT motivation, status FROM Applications WHERE applicantId = ? AND jobId = ?",
      [applicantId, jobId]
    );

    const [[rating]] = await pool.query(
  "SELECT score, feedback, recommended FROM Ratings WHERE applicantId = ?",
  [applicantId]
);


    res.json({
  ...profile,
  motivationMessage: application?.motivationMessage || "",
  status: application?.status || "unknown",
  rating: rating?.score ?? null,
  feedback: rating?.feedback || "",
  recommended: rating?.recommended ?? null
});

  } catch (error) {
    console.error("Error fetching applicant full details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
