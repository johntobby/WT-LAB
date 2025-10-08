const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Import the User model
const User = require('../models/user.model.js');

// --- DEFINE ROUTES ---

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  // Get data from the request body
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. Create a new user instance
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password 
    });

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // 4. Save the user to the database
    await user.save();

    // 5. Send a success response
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @route   POST /api/users/login
// @desc    Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 3. Send a success response (in a real app, you'd send a JWT token here)
        res.status(200).json({ 
            message: 'Login successful!',
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
