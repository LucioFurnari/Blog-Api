const express = require('express');
const router = express.Router();
const { create_user, user_login, get_user_info } = require('../controllers/user');

// Create user POST route
router.post('/users', create_user);

// Login user POST route
router.post('/login', user_login);

// Get user info TEST
router.get('/user', get_user_info);

// Export router
module.exports = router;