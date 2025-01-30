const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes'); // Import the volunteer routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes for authentication
app.use('/api/auth', authRoutes);

// Routes for volunteers
app.use('/api/volunteers', volunteerRoutes); // Use the volunteer route for adding volunteers

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
