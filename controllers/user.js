const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

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
exports.authLocal = passport.authenticate('local', {
  session: true,
  failureMessage: true,
})

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

// Function to verify token
exports.verifyToken = function verifyToken (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader && bearerHeader.split(' ')[1];
  if (token == null) return res.status(401);

  jwt.verify(token, 'Emily', (err, decoded) => {
    if (err) return res.status(403);
    
    // req.user = decoded;
    res.send('Correct user')
    next();
  })
};

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

// Return json token in the response
exports.user_login = async (req, res, next) => {
  const user = req.user.username;
  jwt.sign({user}, 'Emily', (err, token) => {
    res.json({
      token
    })
  });
  // res.status(200).json(req.user);

  // return next();
};

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