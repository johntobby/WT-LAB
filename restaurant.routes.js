const express = require('express');
const router = express.Router();

// Import BOTH models now
const Restaurant = require('../models/restaurant.model.js');
const FoodItem = require('../models/foodItem.model.js');

// --- DEFINE ROUTES ---

// @route   GET /api/restaurants
// @desc    Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- NEW ROUTE ---
// @route   GET /api/restaurants/:id/fooditems
// @desc    Get all food items for a specific restaurant
router.get('/:id/fooditems', async (req, res) => {
  try {
    // Find all food items where the 'restaurant' field matches the ID from the URL
    const foodItems = await FoodItem.find({ restaurant: req.params.id });
    
    if (!foodItems) {
      return res.status(404).json({ message: 'No food items found for this restaurant' });
    }
    
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
