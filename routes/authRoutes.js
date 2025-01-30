const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Signup Route: Store email and password directly in MongoDB
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save it to the database
    const newUser = new User({
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route: Directly compare email and password from database
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare passwords directly (no encryption)
  if (user.password === password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;


