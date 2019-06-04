const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  fullDesc: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;