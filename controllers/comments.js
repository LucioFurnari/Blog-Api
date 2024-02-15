const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');

exports.create_comment =  [
  check('author').trim().escape().notEmpty().withMessage('Author is required'),
  check('text').trim().escape().notEmpty().withMessage('Text is required'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
        const comment = new Comment({
          author: req.user.username,
          text: req.body.text,
          timestamp: req.body.timestamp,
          response_to: req.body.response_to,
          post: req.params.postid,
        });
      
        await comment.save();
      
        res.status(200).json(comment);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
];

exports.get_all_comments = async (req, res) => {
  const comments = await Comment.find({});

  res.status(200).json(comments);
}

exports.get_comment = async (req, res) => {
  const comment = await Comment.findById(req.params.id_comment);

  res.status(200).json(comment);
};

exports.delete_comment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id_comment);

  res.status(200).json(comment);
};

exports.update_comment = async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    _id: req.params.id_comment,
  });

  await Comment.findByIdAndUpdate(req.params.id_comment, comment, {});

  res.status(200).json(comment);
};