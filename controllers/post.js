const Post = require('../models/post');

exports.create_post = async (req, res) => {
  const post = Post({
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    timestamp: req.body.timestamp,
  });

  await post.save();

  res.status(200).json(post);
};

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