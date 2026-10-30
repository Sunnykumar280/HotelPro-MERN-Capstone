const mongoose = require('mongoose');
module.exports = mongoose.model('Room', new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'Standard' },
  price: { type: Number, required: true },
  capacity: { type: Number, default: 2 },
  description: String,
  image: String,
}, { timestamps: true }));
