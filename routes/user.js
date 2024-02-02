const express = require('express');
const router = express.Router();
const { create_user, user_login, user_logout, authLocal, get_user_info } = require('../controllers/user');

// Create user POST route
router.post('/users', create_user);

// Login user POST route
router.post('/login', authLocal, user_login);

// Logout user POST route
router.post('/logout', user_logout);

// Get user info TEST
router.get('/user', get_user_info);

// Export router
module.exports = router;