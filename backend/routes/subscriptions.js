const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Subscription = require('../models/Subscriptions');
const auth = require('../middleware/auth');

const ALGORITHM = 'ADD YOUR ALGORITHM HERE !!';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || 'ADD YOUR KEY HERE !!', 'utf8');
const IV = Buffer.from(process.env.IV || 'ADD YOUR IV HERE !!', 'utf8');

function encrypt(text) {
  if (!text) return '';
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let out = cipher.update(text, 'utf8', 'hex');
  out += cipher.final('hex');
  return out;
}
function decrypt(hex) {
  if (!hex) return '';
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
    let out = decipher.update(hex, 'hex', 'utf8');
    out += decipher.final('utf8');
    return out;
  } catch (e) {
    console.warn(' Failed to decrypt:', hex);
    return hex;
  }
}

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, amount, dueDate, billingCycle, notes, username, password } = req.body;
    if (!name || !amount || !dueDate) return res.status(400).json({ message: 'Missing fields' });

    const sub = new Subscription({
      userId,
      name,
      amount,
      dueDate: new Date(dueDate),
      billingCycle: billingCycle || 'monthly',
      notes: notes || '',
      username: username ? encrypt(username) : '',
      password: password ? encrypt(password) : ''
    });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    console.error('POST /subscriptions error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LIST (with decrypted creds)
router.get('/', auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const mapped = subs.map(s => ({
      ...s._doc,
      username: s.username ? decrypt(s.username) : '',
      password: s.password ? decrypt(s.password) : ''
    }));
    res.json(mapped);
  } catch (err) {
    console.error('GET /subscriptions error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET 
router.get('/:id/credentials', auth, async (req, res) => {
  try {
    const sub = await Subscription.findOne({ _id: req.params.id, userId: req.user.id });
    if (!sub) return res.status(404).json({ message: 'Not found' });
    res.json({ username: sub.username ? decrypt(sub.username) : '', password: sub.password ? decrypt(sub.password) : '' });
  } catch (err) {
    console.error('GET /:id/credentials error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /subscriptions error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
