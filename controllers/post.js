const Post = require('../models/post');

exports.create_post = async (req, res) => {
  const post = Post({
    title: req.body.title,
    text: req.body.text,
  });

  await post.save();

  res.status(200).json(post);
};

exports.get_posts = async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json(posts);
};