const express = require('express');
const router = express.Router();
const { create_comments } = require('../controllers/comments');

// Create comment POST route
router.post('/posts/:id/comments', create_comments);