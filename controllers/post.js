const Post = require('../models/post');
const { check, validationResult } = require('express-validator');

exports.create_post = [
  check('title').trim().escape().notEmpty().withMessage('Title is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  check('author').trim().escape().notEmpty().withMessage('There is no author'),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
      const post = Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user.username,
        timestamp: req.body.timestamp,
      });

      await post.save();

      res.status(200).json(post);
    }
    } catch (error) {
      res.status(500).send(error);
    }
  }
]

exports.update_post = [
  check('title').trim().escape().notEmpty().withMessage('Title is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  
  async (req, res) => {


    const updatedPost = new Post({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      timestamp: req.body.timestamp,
      _id: req.params.id,
    });
  
    const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, {});
  
    res.status(200).json(post);
  },
]

exports.get_posts = async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json(posts);
};

exports.get_post = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json(post);
};

exports.delete_post = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  res.status(200).json(post);
};