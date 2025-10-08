const mongoose = require('mongoose');
require('dotenv').config();

// Import your models
const Restaurant = require('./models/restaurant.model.js');
const FoodItem = require('./models/fooditem.model.js');

// --- YOUR DATA ---
// This is the data that will be imported into the database
const restaurantsData = [
  {
    name: "The Burger Shack",
    cuisine: "Fast Food",
    location: "Beach Road, Visakhapatnam",
    foodItems: [
      { name: "Classic Beef Burger", price: 250 },
      { name: "Chicken Zinger Burger", price: 280 },
      { name: "Panner Thikka Burger", price: 220},
      { name: "Mushroom Burger", price: 290}
    ]
  },
  {
    name: "Pizza Palace",
    cuisine: "Italian",
    location: "IT-Sez, Visakhapatnam",
    foodItems: [
      { name: "Margherita Pizza", price: 350 },
      { name: "Pepperoni Pizza", price: 450 },
      { name: "Peri Peri Pizza", price: 500},
    ]
  },
  {
    name: "Marlin Cay",
    cuisine: "Multi Cuisine",
    location: "Bheemli, Visakhapatnam",
    foodItems: [
      { name: "Fish and Chips", price: 500 },
      { name: "Sea Food Platter", price: 900 },
      { name: "Lemon Chicken", price:500}
    ]
  },
  {
    name: "Frosty Treats",
    cuisine: "Desserts",
    location: "Rushikonda, Visakhapatnam",
    foodItems: [
      { name: "Chocolate Sundae", price: 180 },
      { name: "Vanilla Scoop", price: 100 }
    ]
  },
  {
    name: "Bhawarchi",
    cuisine: "Indian",
    location: "Yendada, Visakhapatnam",
    foodItems: [
        { name: "Chicken Biryani", price: 320 },
        { name: "Mutton Biryani", price: 420 }
    ]
  },
  {
    name: "The Shawarma Spot",
    cuisine: "Middle Eastern",
    location: "Madhurawada, Visakhapatnam",
    foodItems: [
      { name: "Chicken Shawarma", price: 180 },
      { name: "Falafel Wrap", price: 150 }
    ]
  }
];

// --- SCRIPT LOGIC ---

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Seeder connected to MongoDB!'))
  .catch(err => {
    console.error('❌ Seeder connection error:', err.message);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Clear existing data
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();
    console.log('🗑️ Old data destroyed.');

    // Loop through each restaurant in our data array
    for (const restaurant of restaurantsData) {
      // Create the restaurant document
      const createdRestaurant = await Restaurant.create({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        location: restaurant.location
      });
      
      // Get the ID of the newly created restaurant
      const restaurantId = createdRestaurant._id;

      // Create the food items for this restaurant, adding the restaurant's ID to each one
      const itemsToCreate = restaurant.foodItems.map(item => ({
        ...item,
        restaurant: restaurantId
      }));

      // Insert all food items for this restaurant into the database
      await FoodItem.insertMany(itemsToCreate);
    }

    console.log('✅ Data successfully imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();
    console.log('🗑️ Data successfully destroyed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

// This logic runs the correct function based on the command-line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
