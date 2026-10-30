require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/roomModel');
(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await Room.deleteMany();
  await Room.insertMany([
    { name: 'Cozy Single Room', type: 'Single', price: 1500, capacity: 1, description: 'Bed, Wi-Fi, AC and attached bathroom.', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
    { name: 'Deluxe Double Room', type: 'Double', price: 2800, capacity: 2, description: 'King bed, balcony, breakfast included.', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600' },
    { name: 'Family Suite', type: 'Suite', price: 5000, capacity: 4, description: 'Two bedrooms, living area and city view.', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600' },
  ]);
  console.log('Sample rooms added'); process.exit();
})();
