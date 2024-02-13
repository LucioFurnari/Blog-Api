const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index');
const passport = require('passport');
const session = require('express-session');

mongoose.connect('mongodb+srv://luciofurnari99:VfHX5uSjDjMVL4sR@blog-db.tgzgpnb.mongodb.net/Blog-DB?retryWrites=true&w=majority')
.catch((error) => console.log(error));

const app = express();

// Configure cors
app.use(cors());

app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(express.json());

app.use('/api', router.post, router.user, router.comments);

// app.use('/api', router.user);

// app.use('/api', router.comments);

app.listen(3000, () => {
  console.log('Server listen to port 3000!')
});