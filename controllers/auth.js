const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to verify token
exports.verifyToken = function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader && bearerHeader.split(' ')[1];
  if (token == null) return res.status(401);

  jwt.verify(token, 'Emily', (err, decoded) => {
    if (err) return res.status(403).send('Forbidden');

    next();
  })
};

// Create token in login

exports.createToken = function createToken(user) {
  jwt.sign({user}, process.env.AUTH_SECRET_KEY, (err, token) => {
    // req.user.token = token;

    res.json({
      token
    })
  });
}