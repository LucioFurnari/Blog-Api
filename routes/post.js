const express = require('express');
const router = express.Router();
const { create_post, get_posts, get_post } = require('../controllers/post');

// Create post POST route
router.post('/posts', create_post);

// GET all posts
router.get('/posts', get_posts);

// GET post
router.get('/posts/:id', get_post);

// Export router
module.exports = router;