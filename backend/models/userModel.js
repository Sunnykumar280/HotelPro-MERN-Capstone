const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },          // empty for Google-only accounts
  googleId: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true }));
