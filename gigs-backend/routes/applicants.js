const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth'); // ✅ fixed import
const applicantController = require('../controllers/applicantcont');

router.get('/jobs', authenticateToken, applicantController.getAllJobs);
router.post('/apply', authenticateToken, applicantController.applyForJob);
router.put('/profile', authenticateToken, applicantController.updateProfile);
router.post('/bookmarks', authenticateToken, applicantController.bookmarkJob);
router.get('/bookmarks', authenticateToken, applicantController.getBookmarks);

module.exports = router;
