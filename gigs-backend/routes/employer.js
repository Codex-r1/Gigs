// routes/employer.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const employerController = require('../controllers/employercont');

// Job management
router.post('/jobs', authenticateToken, authorizeRoles('employer'), employerController.postJob);
router.delete('/jobs/:id', authenticateToken, authorizeRoles('employer'), employerController.deleteJob);

// Applicant management
router.get('/jobs/:id/applicants', authenticateToken, authorizeRoles('employer'), employerController.viewApplicants);
router.put('/applications/:id/status', authenticateToken, authorizeRoles('employer'), employerController.updateApplicantStatus);

// Profile
router.put('/profile', authenticateToken, authorizeRoles('employer'), employerController.updateProfile);

// Bookmarking
router.post('/bookmark', authenticateToken, authorizeRoles('employer'), employerController.bookmarkApplicant);
router.get('/bookmarks', authenticateToken, authorizeRoles('employer'), employerController.viewBookmarks);
router.get('/dashboard', authenticateToken, authorizeRoles('employer'), async (req, res) => {
  const employer_id = req.user.id;
  try {
    const [[{ active }]] = await db.query(
      'SELECT COUNT(*) as active FROM jobs WHERE employer_id = ? AND status = "Open"', [employer_id]
    );
    const [[{ pending }]] = await db.query(
      'SELECT COUNT(*) as pending FROM applications a JOIN jobs j ON a.job_id = j.job_id WHERE j.employer_id = ? AND a.status = "Pending"', [employer_id]
    );
    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM applications a JOIN jobs j ON a.job_id = j.job_id WHERE j.employer_id = ?', [employer_id]
    );

    res.json({
      active,
      pending,
      totalApplications: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error loading dashboard data' });
  }
});


module.exports = router;
