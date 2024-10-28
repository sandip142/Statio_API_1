const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNo: { type: String, required: true, unique: true },
  stations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' }], // Reference to stations
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true }
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
