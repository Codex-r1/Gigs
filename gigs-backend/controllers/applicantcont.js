// controllers/applicantController.js
const pool = require('../config/database');

exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE status = "Open"');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyForJob = async (req, res) => {
  const { job_id } = req.body;
  const user_id = req.user.id;

  try {
    const [existing] = await pool.query(
      'SELECT * FROM applications WHERE user_id = ? AND job_id = ?', [user_id, job_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    await pool.query(
      'INSERT INTO applications (user_id, job_id, status) VALUES (?, ?, "Pending")',
      [user_id, job_id]
    );

    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { bio, skills, photo, location } = req.body;
  const user_id = req.user.id;

  try {
    const [existing] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [user_id]);

    if (existing.length > 0) {
      await pool.query(
        'UPDATE profiles SET bio = ?, skills = ?, photo = ?, location = ? WHERE user_id = ?',
        [bio, skills, photo, location, user_id]
      );
    } else {
      await pool.query(
        'INSERT INTO profiles (user_id, bio, skills, photo, location) VALUES (?, ?, ?, ?, ?)',
        [user_id, bio, skills, photo, location]
      );
    }

    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookmarkJob = async (req, res) => {
  const { job_id } = req.body;
  const user_id = req.user.id;

  try {
    const [existing] = await pool.query(
      'SELECT * FROM bookmarks WHERE user_id = ? AND job_id = ?', [user_id, job_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already bookmarked' });
    }

    await pool.query(
      'INSERT INTO bookmarks (user_id, job_id) VALUES (?, ?)',
      [user_id, job_id]
    );

    res.json({ message: 'Job bookmarked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [bookmarks] = await pool.query(
      `SELECT jobs.* FROM jobs
       JOIN bookmarks ON jobs.job_id = bookmarks.job_id
       WHERE bookmarks.user_id = ?`,
      [user_id]
    );

    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
