const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName: String,
  seatsAvailable: Number,
  amenities: [String],
  pricePerHour: Number
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;