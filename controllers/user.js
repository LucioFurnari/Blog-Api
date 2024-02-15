const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { createToken } = require('./auth');
const { check, validationResult } = require('express-validator');

passport.use(new LocalStrategy( async (username, password, done) => {
  try {
    const userFromDB = await User.findOne({ name: username });
    if (!userFromDB) {
      return done(null, false, { message: 'User not found' });
    };
    const match = await bcryptjs.compare(password, userFromDB.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, userFromDB);
  } catch (error) {
    return done(error);
  }
}))

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


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
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array()})
    }
    next()
  },
  passport.authenticate('local', {
    session: true,
    failureMessage: true,
  })
  // , (req, res) =>{
  //   const user = req.user

  //   createToken(res,user)
  // }
]

exports.user_logout = async (req, res) => {
  req.logout( (err) => {
    if (err) return next(err);
    res.send('User logout')
  })
};

exports.get_user_info = async (req, res) => {
  if (!req.user) {
    res.send('There is not user logged');
  } else {
    res.json(req.user);
  }
};