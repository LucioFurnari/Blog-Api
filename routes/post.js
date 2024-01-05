const express = require('express');
const router = express.Router();
const { create_post } = require('../controllers/post');

router.post('/posts', create_post);

// Export router
module.exports = router;