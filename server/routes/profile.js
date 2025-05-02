const express = require('express');
const router = express.Router();
const { createProfile, getProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth'); // Import the middleware

// Profile routes
router.post('/create', authenticateToken, createProfile);
router.get('/getProfile', authenticateToken, getProfile);

module.exports = router;