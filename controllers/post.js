const { default: mongoose } = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');

exports.create_post = [
  check('title').trim().escape().notEmpty().withMessage('Title is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } 
      const post = Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user.username,
        timestamp: req.body.timestamp,
      });

      await post.save();

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: {error, message: 'Internal server error, post not saved'} });
    }
  }
]

exports.update_post = [
  check('title').trim().escape().notEmpty().withMessage('Title is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  check('author').trim().escape().notEmpty().withMessage('There is no author'),
  async (req, res) => {
    try {
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const _id = req.params.id;
      const isValidId = mongoose.Types.ObjectId.isValid(_id);

      if (!isValidId) {
        return res.status(400).json({ error: 'Id is not valid' });
      }

      const updatedPost = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        timestamp: req.body.timestamp,
        _id: req.params.id,
      });
      
      const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, {});

      if (post === null) {
        return res.status(404).json({ error: 'Post not found'});
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: {error, message: 'Internal server error, post not updated'} });
    }
  },
]

exports.get_posts = async (req, res) => {
  try {
    const posts = await Post.find({});

    if (!posts.length) {
      return res.status(404).json({ error: 'Posts not found' });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: {error, message: 'Internal server error'} })
  }
};

exports.get_post = async (req, res) => {
  try {
    const _id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(_id);
    if (!isValidId) {
      return res.status(400).json({ error: 'The id is invalid' });
    }
    const post = await Post.findById(req.params.id);

    if (post === null) {
      return res.status(404).json({ error: 'Post not found'})
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({error: {error, message: 'Internal server error'}});
  }
};

exports.delete_post = async (req, res) => {
  try {
    const _id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(_id);

    if (!isValidId) {
      return res.status(400).json({ error: 'The is is invalid' });
    }

    await Comment.deleteMany({ post: _id });
    const post = await Post.findByIdAndDelete(_id);

    if (post === null) {
      return res.status(404).json({ error: 'Post not found'});
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({error: {error, message: 'Internal server error'}});
  }
};