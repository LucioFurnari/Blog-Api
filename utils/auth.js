const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verify token
function verifyToken (token) {
  return jwt.verify(token, process.env.AUTH_SECRET_KEY);
}

// Function to verify token
exports.authenticateToken = async function authenticateToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader && bearerHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: 'Unauthorized - Token not provided'});
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden - Invalid token' });
  }
};

// Create token in login

exports.createToken = function createToken(user) {
  return jwt.sign({user}, process.env.AUTH_SECRET_KEY);
}