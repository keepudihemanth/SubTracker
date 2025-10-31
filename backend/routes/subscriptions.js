// backend/routes/subscriptions.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Subscription = require("../models/Subscriptions"); 
const auth = require("../middleware/auth");

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY || "fallback_secret_key_123456")
  .digest();
const IV = Buffer.alloc(16, 0); 

//  Encrypt helper
function encrypt(text) {
  if (!text) return "";
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

//  Decrypt helper
function decrypt(encryptedText) {
  if (!encryptedText) return "";
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

//  Add new subscription
router.post("/", auth, async (req, res) => {
  try {
    console.log("📩 Incoming subscription data:", req.body);
    const { name, amount, dueDate, billingCycle, notes, username, password } = req.body;

    if (!name || !amount || !dueDate)
      return res.status(400).json({ message: "Name, amount, and due date are required" });

    const encryptedUsername = username ? encrypt(username) : "";
    const encryptedPassword = password ? encrypt(password) : "";

    const newSub = new Subscription({
      userId: req.user.id, 
      name,
      amount,
      dueDate,
      billingCycle,
      notes,
      username: encryptedUsername,
      password: encryptedPassword,
    });

    await newSub.save();
    console.log(" Subscription saved:", newSub);

    res.status(201).json({ message: "Subscription added successfully", subscription: newSub });
  } catch (err) {
    console.error(" Error adding subscription:", err);
    res.status(500).json({ message: "Server error while adding subscription" });
  }
});

//  Get all subscriptions for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user.id });

    const decryptedSubs = subs.map((sub) => ({
      ...sub._doc,
      username: sub.username ? decrypt(sub.username) : "",
      password: sub.password ? decrypt(sub.password) : "",
    }));

    res.json(decryptedSubs);
  } catch (err) {
    console.error(" Get subscriptions error:", err);
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
});

module.exports = router;
