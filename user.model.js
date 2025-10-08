const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true // Removes whitespace
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    trim: true,
    lowercase: true // Store emails in lowercase for consistency
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
