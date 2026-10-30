// Deletes ALL users so you can register fresh. Run: npm run resetusers
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  const r = await User.deleteMany();
  console.log('Deleted users:', r.deletedCount);
  process.exit();
})();
