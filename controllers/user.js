const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../utils/auth');
const { check, validationResult } = require('express-validator');

exports.create_user = [
  check('user_name').trim().escape().notEmpty().withMessage('Name is required')
  .isLength({ min: 3 }).withMessage('The name must be a minimum of 3 characters'),
  check('user_email').trim().escape().notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Enter a valid email'),
  check('password').trim().notEmpty().withMessage('Password is required')
  .isLength({ min: 8}).withMessage('The name must be a minimum of 8 characters'),
  async (req, res) => {
  let errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  } else {
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
  }
}
];

// Return json token in the response
exports.user_login = [
  check('username').trim().escape().notEmpty().withMessage('Enter your user name'),
  check('password').trim().escape().notEmpty().withMessage('Enter your password'),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()})
    }

    try {
      const userFromDB = await User.findOne({ name: req.body.username });

    if (!userFromDB) {
      return res.status(404).json({ error: 'User not found' });
    }

    const match = await bcryptjs.compare(req.body.password, userFromDB.password);

    if (!match) {
      return res.status(401).json({ error: 'The password is incorrect' });
    }

    const token = createToken(userFromDB);
    res.status(200).json({ token });

    } catch (error) {
      console.error('Error loggin in', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
];

exports.get_user_info = async (req, res) => {
  if (!req.user) {
    res.send('There is not user logged');
  } else {
    res.json(req.user);
  }
};