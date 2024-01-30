const express = require('express');
const router = express.Router();
const { create_user } = require('../controllers/user');

// Create user POST route
router.post('/users', create_user);


// Export router
module.exports = router;