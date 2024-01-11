const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
});

// Export model
module.exports = mongoose.model('User', UserSchema);