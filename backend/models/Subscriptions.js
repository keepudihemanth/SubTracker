const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  billingCycle: { type: String, default: 'monthly' },
  notes: { type: String, default: '' },
  username: { type: String, default: '' },
  password: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
