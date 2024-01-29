const Comments = require('../models/comment');

exports.create_comment = async (req, res) => {
  const comment = new Comments({
    author: req.body.author,
    text: req.body.text,
    timestamp: req.body.timestamp,
    post: req.params.id,
  });

  await comment.save();

  res.status(200).json(comment);
};