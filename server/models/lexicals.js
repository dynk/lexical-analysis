const mongoose = require('mongoose');

const LexicalSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  }
});

module.exports = mongoose.model('lexicals', LexicalSchema);
