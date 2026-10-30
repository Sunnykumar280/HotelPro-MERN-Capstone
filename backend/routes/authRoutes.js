const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');

const isAdminEmail = email => email === (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

const reply = user => ({
  token: jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' }),
  user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
});

router.post('/register', async (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered. Please login.' });
    const user = await new User({
      name, email, password: await bcrypt.hash(password, 10), isAdmin: isAdminEmail(email),
    }).save();
    res.status(201).json(reply(user));   // logs the user in right after registering
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email. Please register first.' });
    if (!user.password) return res.status(400).json({ message: 'This account uses Google. Click "Continue with Google".' });
    if (!(await bcrypt.compare(req.body.password || '', user.password)))
      return res.status(401).json({ message: 'Incorrect password' });
    res.json(reply(user));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Google sign-in: frontend sends the Google credential (ID token), we verify it here
router.post('/google', async (req, res) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID) return res.status(500).json({ message: 'GOOGLE_CLIENT_ID is not set in backend/.env' });
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken: req.body.credential, audience: process.env.GOOGLE_CLIENT_ID });
    const { email, name, sub, email_verified } = ticket.getPayload();
    if (!email_verified) return res.status(400).json({ message: 'Google email is not verified' });

    const mail = email.toLowerCase();
    let user = await User.findOne({ email: mail });
    if (!user) user = await new User({ name: name || mail.split('@')[0], email: mail, googleId: sub, isAdmin: isAdminEmail(mail) }).save();
    else if (!user.googleId) { user.googleId = sub; await user.save(); }
    res.json(reply(user));
  } catch (e) { res.status(401).json({ message: 'Google sign-in failed: ' + e.message }); }
});

module.exports = router;
