const express = require('express');
const router = express.Router();
const { create_comment, get_all_comments, get_comment, delete_comment, update_comment } = require('../controllers/comments');

// Create comment POST route
router.post('/posts/:id/comments', create_comment);

// See all comments for the post GET route
router.get('/posts/:id/comments', get_all_comments);

// Get one individual comment GET route
router.get('/posts/:id/comments/:id_comment', get_comment);

// Delete comment DELETE route
router.delete('/posts/:id/comments/:id_comment', delete_comment);

// Update comment PUT route
router.put('/posts/:id/comments/:id_comment', update_comment);

// Export router
module.exports = router;