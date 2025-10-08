require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Import Routes ---
const restaurantRoutes = require('./routes/restaurant.routes.js');
const userRoutes = require('./routes/user.routes.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((error) => console.error('❌ Error connecting to MongoDB:', error.message));

// A test route
app.get('/', (req, res) => {
  res.send('BlinkEats API is running!');
});

// --- Use Routes ---
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
