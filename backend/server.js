require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple fallback array if MongoDB is not connected
let localReviews = [
  {
    _id: "1",
    name: "John Smith",
    projectName: "HR System Audit",
    role: "Operations Manager",
    description: "Shiya provided an incredibly thorough audit of our systems. Her expertise helped us save time and streamline our entire HR workflow efficiently.",
    date: new Date()
  },
  {
    _id: "2",
    name: "Sarah Lee",
    projectName: "Talent Acquisition Strategy",
    role: "CEO",
    description: "Working with Shiya completely transformed our hiring process. We are now attracting top-tier talent thanks to her strategic sourcing insights.",
    date: new Date()
  }
];

// MongoDB Connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected...');
    } else {
      console.log('No MONGODB_URI found. Using in-memory array for reviews (Local Mode).');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

connectDB();

// Review Schema (only used if MongoDB is connected)
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectName: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

// Routes
app.get('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find().sort({ date: -1 });
      res.json(reviews);
    } else {
      res.json(localReviews);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { name, projectName, role, description } = req.body;
  
  if (!name || !projectName || !role || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const newReview = new Review({ name, projectName, role, description });
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } else {
      const newReview = { _id: Date.now().toString(), name, projectName, role, description, date: new Date() };
      localReviews.unshift(newReview); // Add to beginning of array
      res.status(201).json(newReview);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
