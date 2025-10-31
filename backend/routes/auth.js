// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//  Register
router.post("/register", async (req, res) => {
  try {
    console.log(" Register request received:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash });
    const savedUser = await newUser.save();

    console.log(" User saved to MongoDB:", savedUser);
    res.status(201).json({ message: "Register success! Now login." });
  } catch (err) {
    console.error(" Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

//  Login
router.post("/login", async (req, res) => {
  try {
    console.log(" Login request:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log(" Login successful:", email);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(" Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
