const mongoose = require('mongoose');

// Train schema (embedded within Station schema)
const TrainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true }
});

// Station schema
const StationSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  stationCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Operational', 'Non-Operational'], default: 'Operational' },
  trains: [TrainSchema]  // Array of Train objects
});

const Station = mongoose.model('Station', StationSchema);
module.exports = Station;
