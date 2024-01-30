const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy( async (username, password, done) => {
  try {
    const userFromDB = await User.findOne({ email: username });
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

exports.user_login = async (req, res) => {
  passport.authenticate('local', {
    
  })
};

exports.get_user_info = async (req, res) => {
  
};