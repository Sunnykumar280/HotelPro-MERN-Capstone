const mongoose = require('mongoose');
module.exports = mongoose.model('Booking', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalAmount: Number,
  status: { type: String, default: 'booked' },
}, { timestamps: true }));
