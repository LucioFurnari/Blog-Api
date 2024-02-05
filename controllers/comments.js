const Comment = require('../models/comment');

exports.create_comment = async (req, res) => {
  const comment = new Comment({
    author: req.body.author,
    text: req.body.text,
    timestamp: req.body.timestamp,
    response_to: req.body.response_to,
    post: req.params.id,
  });

  await comment.save();

  res.status(200).json(comment);
};

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