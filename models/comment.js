const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = Schema({
  author: String,
  text: String,
  timestamp: String,
  response_to: { type: Schema.Types.ObjectId, default: null },
  post: Schema.Types.ObjectId,
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);