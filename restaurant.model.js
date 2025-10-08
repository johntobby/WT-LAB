const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Each restaurant should have a unique name
  },
  cuisine: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
