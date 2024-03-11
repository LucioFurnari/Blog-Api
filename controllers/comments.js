const { default: mongoose } = require('mongoose');
const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');

exports.create_comment =  [
  check('author').trim().escape().notEmpty().withMessage('Author is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const comment = new Comment({
        author: req.user.username,
        text: req.body.text,
        timestamp: req.body.timestamp,
        response_to: req.body.response_to,
        post: req.params.postid,
      });

      await comment.save();
      
      res.status(201).json(comment);

    } catch (error) {
      res.status(500).json({ error: {error, message: 'Internal server error'} });
    }
  }
];

exports.get_all_comments = async (req, res) => {
  const _id = req.params.postid;
  const isValid = mongoose.Types.ObjectId.isValid(_id);

  if (!isValid) {
    return res.status(400).json({ error: 'The id is not valid' });
  }

  const comments = await Comment.find({ post: _id });

  if (!comments.length) {
    return res.status(404).json({ error: 'Comments not found1'});
  }

  res.status(200).json(comments);
}

exports.get_comment = async (req, res) => {
  const _id = req.params.id_comment;
  const isValidId = mongoose.Types.ObjectId.isValid(_id);

  if (!isValidId) {
    return res.status(400).json({ error: 'The id is not valid' });
  }
  const comment = await Comment.findById(_id);

  if (!comment === null) {
    return res.status(404).json({ error: 'Comment not found' });4
  }

  res.status(200).json(comment);
};

exports.delete_comment = async (req, res) => {
  const _id = req.params.id_comment;
  const isValidId = mongoose.Types.ObjectId.isValid(_id);

  if (!isValidId) {
    return res.status(400).json({ error: 'The is is not valid' });
  }

  const comment = await Comment.findByIdAndDelete(req.params.id_comment);

  if (comment === null) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.status(200).json(comment);
};

exports.update_comment = [
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const _id = req.params.id_comment;
      const isValidId = mongoose.Types.ObjectId.isValid(_id);

      if (!isValidId) {
        return res.status(400).json({ error: 'The id of the comment is invalid' });
      }

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const comment = new Comment({
        text: req.body.text,
        timestamp: '',
        _id: req.params.id_comment,
      });

      const updatedComment = await Comment.findByIdAndUpdate(req.params.id_comment, comment, {});

      if (updatedComment === null) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: { error, message: 'Internal server error' }});
    }
  } 
]