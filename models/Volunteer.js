// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  event: { type: String, required: true },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
