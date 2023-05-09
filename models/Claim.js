const mongoose = require('mongoose');

const expressSchema = new mongoose.Schema({
  matiere: {
    type: [String], // an array of strings
    required: true
  },
  commentaire: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Express', expressSchema);
