const express = require('express');
const router = express.Router();
const { create_comment, get_all_comments } = require('../controllers/comments');

// Create comment POST route
router.post('/posts/:id/comments', create_comment);

// See all comments for the post GET route
router.get('/posts/:id/comments', get_all_comments);


// Export router
module.exports = router;