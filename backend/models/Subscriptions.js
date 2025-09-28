const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },           // e.g. Netflix
  price: { type: Number, required: true },
  billingCycle: { type: String, default: 'monthly' }, // monthly / yearly
  nextDueDate: { type: Date },
  notes: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
