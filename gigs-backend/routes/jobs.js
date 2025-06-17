const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');


// POST /api/jobs
router.post('/jobs', authenticateToken, (req, res) => {
  const { title, description, location, category } = req.body;
  const employer_id = req.user?.userId;

  console.log("Employer ID:", employer_id);
  console.log("Job post body:", req.body);

  if (!employer_id) {
    return res.status(401).json({ error: "Missing employer ID from token." });
  }

  if (!title || !description || !location || !category) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const query = `
    INSERT INTO jobs (employer_id, title, description, location, category, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'open', NOW())
  `;

  pool.query(
    query,
    [employer_id, title, description, location, category],
    (err, result) => {
      if (err) {
        console.error("❌ SQL Error:", err.sqlMessage || err.message);
        return res.status(500).json({ error: err.sqlMessage || "Error saving job" });
      }

      console.log("✅ Job inserted:", result.insertId);
      res.status(201).json({ message: "Job posted successfully", job_id: result.insertId });
    }
  );
});

// GET /api/jobs
router.get('/jobs', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Jobs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});
module.exports = router;
