

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // Fields from this file
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  billingCycle: { type: String, default: 'monthly' },
  notes: { type: String, required: false },
  active: { type: Boolean, default: true },

  // UPDATED 
  amount: { type: Number, required: true },  
  dueDate: { type: Date, required: true }, 
  
  // ADDED for credentials 
  username: { type: String, required: false },
  password: { type: String, required: false } 
  
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);