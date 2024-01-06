const express = require('express');
const router = express.Router();
const { create_post, get_posts } = require('../controllers/post');

// Create post POST route
router.post('/posts', create_post);

// GET all posts
router.get('/posts', get_posts);

// Export router
module.exports = router;