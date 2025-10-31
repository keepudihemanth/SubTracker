// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- App Setup ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:5173', // change to your frontend port (e.g. 3000 or 5173 for Vite)
  credentials: true
}));
app.use(express.json());

// --- Debug logger ---
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// --- MongoDB Connection (Atlas) ---
const mongoURI = process.env.ATLAS_URL || process.env.MONGO_URI;

if (!mongoURI) {
  console.error(" Missing ATLAS_URL or MONGO_URI in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB Atlas connected successfully'))
.catch((err) => {
  console.error(' MongoDB connection error:', err.message);
  process.exit(1);
});

// --- Routes ---
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscriptions');

app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// --- Health check ---
app.get('/', (req, res) => {
  res.send('SubTracker Backend is Running ');
});

app.get('/health', (req, res) => res.json({ ok: true }));

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Server error' });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
