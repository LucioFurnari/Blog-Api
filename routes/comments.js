const express = require('express');
const router = express.Router();
const { create_comment, get_all_comments, get_comment, delete_comment, update_comment } = require('../controllers/comments');
const { authenticateToken } = require('../utils/auth');

// Create comment POST route
router.post('/posts/:postid/comments', authenticateToken, create_comment);

// See all comments for the post GET route
router.get('/posts/:postid/comments', get_all_comments);

// Get one individual comment GET route
router.get('/posts/:postid/comments/:id_comment', get_comment);

// Delete comment DELETE route
router.delete('/posts/:postid/comments/:id_comment', delete_comment);

// Update comment PUT route
router.put('/posts/:postid/comments/:id_comment', update_comment);

// Export router
module.exports = router;