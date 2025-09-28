const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const subRoutes = require('./routes/subscriptions');

const app = express();
const PORT = 5000;

// MongoDB connection
const MONGO_URI = "mongodb+srv://<Your Username>:<Your DB password>@subdb.g2qna0u.mongodb.net/subtracker?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });


// Middleware
app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/subscriptions', subRoutes);

// Health check
app.get('/', (req, res) => res.send('SubTracker API is running'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
