const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Station = require('./Models/station'); // Assuming the Station model is correctly set up
const cors = require('cors'); 
const dotenv = require('dotenv');
const { DB_NAME } = require('./constant'); // Import DB_NAME

dotenv.config({ path: "./.env" }); // Correct path to .env

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Create Station API (POST)
app.post('/stations', async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Stations API (GET)
app.get('/stations', async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Station by Code (GET)
app.get('/stations/:code', async (req, res) => {
  try {
    const station = await Station.findOne({ stationCode: req.params.code });
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Station API (PUT)
app.put('/stations/:code', async (req, res) => {
  try {
    const station = await Station.findOneAndUpdate(
      { stationCode: req.params.code },
      req.body,
      { new: true, runValidators: true } // Ensures validators are run on update
    );
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Station API (DELETE)
app.delete('/stations/:code', async (req, res) => {
  try {
    const station = await Station.findOneAndDelete({ stationCode: req.params.code });
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.status(200).json({ message: 'Station deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
