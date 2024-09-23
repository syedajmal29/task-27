const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const Room = require('./models/room');
const Booking = require('./models/booking');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hallbooking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// 1. Creating a Room
app.post('/room', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create room', details: error });
  }
});

// 2. Booking a Room
app.post('/booking', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (error) {
    res.status(400).json({ error: 'Failed to book room', details: error });
  }
});

// 3. List all Rooms with Booked Data
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().populate({
      path: 'bookings',
      populate: { path: 'roomId' }
    });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list rooms', details: error });
  }
});

// 4. List all Customers with Booked Data
app.get('/customers', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('roomId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list customers', details: error });
  }
});

// 5. List how many times a customer has booked the room
app.get('/customer-bookings/:customerName', async (req, res) => {
  try {
    const bookings = await Booking.find({ customerName: req.params.customerName }).populate('roomId');
    res.status(200).json({
      totalBookings: bookings.length,
      bookings: bookings
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve customer bookings', details: error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});