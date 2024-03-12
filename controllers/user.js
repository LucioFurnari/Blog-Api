const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../utils/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.create_user = [
  check('username').trim().escape().notEmpty().withMessage('Name is required')
  .isLength({ min: 3 }).withMessage('The name must be a minimum of 3 characters'),
  check('email').trim().escape().notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Enter a valid email'),
  check('password').trim().notEmpty().withMessage('Password is required')
  .isLength({ min: 8}).withMessage('The name must be a minimum of 8 characters'),
  async (req, res) => {
  try {
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) throw err;
      else {
        const user = new User({
          name: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
  
        await user.save();
        res.status(200).json(user);
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error, user not created'});
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

    const token = createToken({ username: userFromDB.name });
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    res.status(200).json({ token, expire_time: decodedToken.exp });

    } catch (error) {
      console.error('Error loggin in', error);
      return res.status(500).json({ error: 'Internal server error, user not logged' });
    }
  },
];

exports.session = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decodedToken.exp - currentTime;

    res.status(200).json({
      message: 'You are signed in.',
      expiresIn: timeLeft > 0 ? `${timeLeft} seconds` : 'Token expired.',
      username: decodedToken.username,
    });

  } catch (error) {
    res.status(400).json({ error: { error, message: 'Invalid token' } });
  }
};