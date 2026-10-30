const router = require('express').Router();
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const { auth } = require('../middlewares/auth');

// Average rating and count for every room: { roomId: { avg, count } }
router.get('/summary', async (req, res) => {
  const rows = await Review.aggregate([{ $group: { _id: '$room', avg: { $avg: '$rating' }, count: { $sum: 1 } } }]);
  const out = {};
  rows.forEach(r => { out[r._id] = { avg: Math.round(r.avg * 10) / 10, count: r.count }; });
  res.json(out);
});

router.get('/room/:roomId', async (req, res) => {
  res.json(await Review.find({ room: req.params.roomId }).populate('user', 'name').sort({ createdAt: -1 }));
});

// Add or update your review (only for rooms you have booked)
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, comment } = req.body;
    const rating = Number(req.body.rating);
    if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ message: 'Rating must be 1 to 5' });
    const booked = await Booking.findOne({ user: req.user.id, room: roomId, status: 'booked' });
    if (!booked) return res.status(403).json({ message: 'You can review a room only after booking it' });
    const review = await Review.findOneAndUpdate(
      { room: roomId, user: req.user.id },
      { rating, comment: (comment || '').trim() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(review);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
