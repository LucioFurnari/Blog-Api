const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = Schema({
  title: String,
  text: String,
  body: Object,
  author: String,
  timestamp: String,
});

// Export model
module.exports = mongoose.model('Post', PostSchema);