const router = require('express').Router();
const Room = require('../models/roomModel');
const { auth, admin } = require('../middlewares/auth');

router.get('/', async (req, res) => res.json(await Room.find().sort({ createdAt: -1 })));

router.post('/', auth, admin, async (req, res) => {
  try { const room = new Room(req.body); await room.save(); res.status(201).json(room); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/:id', auth, admin, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
});

module.exports = router;
