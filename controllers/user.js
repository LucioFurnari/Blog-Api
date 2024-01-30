const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.create_user = async (req, res) => {
  bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) throw err;
    else {
      const user = new User({
        name: req.body.user_name,
        email: req.body.user_email,
        password: hashedPassword,
      });

      await user.save();
      res.status(200).json(user);
    }
  })
};