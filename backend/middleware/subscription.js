// This is your UPDATED 'middleware/subscription.js' file

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // Fields from this file
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  billingCycle: { type: String, default: 'monthly' },
  notes: { type: String, required: false },
  active: { type: Boolean, default: true },

  // --- UPDATED to match React/Routes ---
  amount: { type: Number, required: true },  // Changed from 'price'
  dueDate: { type: Date, required: true }, // Changed from 'nextDueDate'
  
  // --- ADDED for credentials ---
  username: { type: String, required: false },
  password: { type: String, required: false } // Will store the encrypted password
  
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);