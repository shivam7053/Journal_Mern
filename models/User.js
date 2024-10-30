const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'editor', 'administrator'] },
  profilePhoto: String,
  college: String,
  introduction: String,
});

module.exports = mongoose.model('User', UserSchema);
