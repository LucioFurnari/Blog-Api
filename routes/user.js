const express = require('express');
const router = express.Router();
const { create_user, user_login, session } = require('../controllers/user');
const { authenticateToken } = require('../utils/auth');

// Create user POST route
router.post('/register', create_user);

// Login user POST route
router.post('/login', user_login);

// Get user info TEST
router.get('/session', authenticateToken, session);

// Export router
module.exports = router;