const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  date: String,
  startTime: String,
  endTime: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  bookingStatus: { type: String, default: 'Booked' },
  bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;