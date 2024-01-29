const User = require('../models/user');

exports.create_user = async (req, res) => {
  const user = new User({
    name: req.body.user_name,
    email: req.body.user_email,
    password: req.body.user_password
  });
};