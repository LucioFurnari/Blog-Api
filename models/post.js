const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = Schema({
  title: String,
  text: String,
});

// Export model
module.exports = mongoose.model('Post', PostSchema);