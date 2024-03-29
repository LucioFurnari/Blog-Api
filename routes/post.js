const express = require('express');
const router = express.Router();
const { create_post, get_posts, get_post, delete_post, update_post } = require('../controllers/post');
const { authenticateToken } = require('../utils/auth');

// Create post POST route
router.post('/posts', authenticateToken, create_post);

// GET all posts
router.get('/posts', get_posts);

// GET post
router.get('/posts/:id', get_post);

// DELETE post
router.delete('/posts/:id', authenticateToken, delete_post);

// UPDATE post
router.put('/posts/:id', authenticateToken, update_post);

// Export router
module.exports = router;