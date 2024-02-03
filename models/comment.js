const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = Schema({
  author: String,
  text: String,
  timestamp: String,
  post: Schema.Types.ObjectId,
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);