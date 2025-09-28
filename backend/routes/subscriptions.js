const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema
const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  billingCycle: { type: String, default: 'monthly' },
  notes: { type: String }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// GET meth
router.get('/', async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ dueDate: 1 });
    res.json(subs);
  } catch (err) {
    console.error('GET /subscriptions error:', err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// POST metho
router.post('/', async (req, res) => {
  try {
    const { name, amount, dueDate, billingCycle, notes } = req.body;

    if (!name || !amount || !dueDate) {
      return res.status(400).json({ error: 'Name, amount, and dueDate are required' });
    }

    const sub = new Subscription({
      name,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      billingCycle: billingCycle || 'monthly',
      notes
    });

    const saved = await sub.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /subscriptions error:', err);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// DELETE meth
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid subscription ID' });
    }

    const deleted = await Subscription.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Subscription not found' });

    res.json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    console.error('DELETE /subscriptions/:id error:', err);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

module.exports = router;
