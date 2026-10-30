const router = require('express').Router();
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const { auth, admin } = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const inDate = new Date(checkIn), outDate = new Date(checkOut);
    if (!(outDate > inDate)) return res.status(400).json({ message: 'Check-out must be after check-in' });
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    const clash = await Booking.findOne({ room: roomId, status: 'booked', checkIn: { $lt: outDate }, checkOut: { $gt: inDate } });
    if (clash) return res.status(400).json({ message: 'Room is not available for these dates' });
    const nights = Math.ceil((outDate - inDate) / 86400000);
    const booking = await new Booking({ user: req.user.id, room: roomId, checkIn: inDate, checkOut: outDate, totalAmount: nights * room.price }).save();
    res.status(201).json(booking);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/mine', auth, async (req, res) =>
  res.json(await Booking.find({ user: req.user.id }).populate('room').sort({ createdAt: -1 })));

router.put('/:id/cancel', auth, async (req, res) => {
  const filter = req.user.isAdmin ? { _id: req.params.id } : { _id: req.params.id, user: req.user.id };
  res.json(await Booking.findOneAndUpdate(filter, { status: 'cancelled' }, { new: true }));
});

router.get('/', auth, admin, async (req, res) =>
  res.json(await Booking.find().populate('room').populate('user', 'name email').sort({ createdAt: -1 })));

module.exports = router;
