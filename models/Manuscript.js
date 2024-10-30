const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['student', 'professor', 'researcher'], required: true }
});

const ManuscriptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [AuthorSchema], // Array of authors
  abstract: { type: String, required: true },
  subject: { type: String, required: true },
  file: { type: String, required: true }, // URL or path to the file
  status: { type: String, default: 'pending review' }
});

module.exports = mongoose.model('Manuscript', ManuscriptSchema);
