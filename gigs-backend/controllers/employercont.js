// controllers
const pool = require('../config/database');

exports.postJob = async (req, res) => {
  const { title, description, location, category } = req.body;
  const employer_id = req.user.id;
  try {
    await pool.query(
      'INSERT INTO jobs (employer_id, title, description, location, category, status) VALUES (?, ?, ?, ?, ?, ?)',
      [employer_id, title, description, location, category, 'Open']
    );
    res.json({ message: 'Job posted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const employer_id = req.user.id;

  try {
    await pool.query('DELETE FROM jobs WHERE job_id = ? AND employer_id = ?', [jobId, employer_id]);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.viewApplicants = async (req, res) => {
  const jobId = req.params.id;

  try {
    const [rows] = await pool.query(
      `SELECT a.application_id, u.user_id, u.name, u.email, a.status
       FROM applications a
       JOIN users u ON a.user_id = u.user_id
       WHERE a.job_id = ?`, [jobId]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateApplicantStatus = async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await pool.query('UPDATE applications SET status = ? WHERE application_id = ?', [status, applicationId]);
    res.json({ message: `Application ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { company_name, bio, contact, logo } = req.body;
  const user_id = req.user.id;

  try {
    const [exists] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [user_id]);

    if (exists.length > 0) {
      await pool.query(
        'UPDATE profiles SET company_name = ?, bio = ?, contact = ?, logo = ? WHERE user_id = ?',
        [company_name, bio, contact, logo, user_id]
      );
    } else {
      await pool.query(
        'INSERT INTO profiles (user_id, company_name, bio, contact, logo) VALUES (?, ?, ?, ?, ?)',
        [user_id, company_name, bio, contact, logo]
      );
    }

    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookmarkApplicant = async (req, res) => {
  const employer_id = req.user.id;
  const { applicant_id } = req.body;

  try {
    await pool.query(
      'INSERT IGNORE INTO bookmarked_applicants (employer_id, applicant_id) VALUES (?, ?)',
      [employer_id, applicant_id]
    );
    res.json({ message: 'Applicant bookmarked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.viewBookmarks = async (req, res) => {
  const employer_id = req.user.id;

  try {
    const [bookmarks] = await pool.query(
      `SELECT u.user_id, u.name, u.email
       FROM bookmarked_applicants b
       JOIN users u ON b.applicant_id = u.user_id
       WHERE b.employer_id = ?`,
      [employer_id]
    );

    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
