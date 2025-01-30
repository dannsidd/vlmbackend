// routes/volunteerRoutes.js
const express = require('express');
const Volunteer = require('../models/Volunteer');
const router = express.Router();

// Add volunteer route
router.post('/add', async (req, res) => {
  const { name, email, contact, event } = req.body;

  if (!name || !email || !contact || !event) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newVolunteer = new Volunteer({
    name,
    email,
    contact,
    event,
  });

  try {
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add volunteer' });
  }
});

module.exports = router;
