const express = require('express');
const router = express.Router();
const { create_post, get_posts, get_post, delete_post, update_post } = require('../controllers/post');

// Create post POST route
router.post('/posts', create_post);

// GET all posts
router.get('/posts', get_posts);

// GET post
router.get('/posts/:id', get_post);

// DELETE post
router.delete('/posts/:id', delete_post);

// UPDATE post
router.put('/posts/:id', update_post);

// Export router
module.exports = router;