const express = require('express');
const router = express.Router();
const Subscription = require('../middleware/subscription');
const crypto = require('crypto');
const authMiddleware = require('../middleware/authMiddleware');

// Encryption setup
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';
const IV = process.env.IV || '1234567890123456';
const ALGORITHM = 'aes-256-cbc';

function encrypt(text) {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 🔒 Protect this route
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, amount, dueDate, billingCycle, notes, username, password } = req.body;

    if (!name || !amount || !dueDate) {
      return res.status(400).json({ error: 'Name, amount, and dueDate are required' });
    }

    const encryptedPassword = password ? encrypt(password) : null;

    const sub = new Subscription({
      name,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      billingCycle: billingCycle || 'monthly',
      notes,
      username: username || null,
      password: encryptedPassword,
      user: req.user.id, // ✅ logged-in user ID from token
    });

    const saved = await sub.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /subscriptions error:', err);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

module.exports = router;
