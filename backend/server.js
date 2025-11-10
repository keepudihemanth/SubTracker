// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscriptions");

const app = express();

const sendEmailReminder = require("./utils/mailer");
const User = require("./models/User");
const Subscription = require("./models/Subscriptions");
//  Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin (Vite default)
    credentials: true,
  })
);

//  MongoDB Connection
mongoose
  .connect(process.env.ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

//  Default route
app.get("/", (req, res) => {
  res.send(" Subscription Tracker Backend is running!");
});

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

//  Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));


// Add this import at the top with others
const auth = require("./middleware/auth");

// ✅ Send reminder email
app.post("/api/subscriptions/:id/remind", auth, async (req, res) => {
  try {
    const userId = req.user.id; // from token middleware
    const subId = req.params.id;

    const sub = await Subscription.findById(subId);
    if (!sub) return res.status(404).json({ message: "Subscription not found" });

    const user = await User.findById(userId);
    if (!user || !user.email)
      return res.status(400).json({ message: "User email missing" });

    const html = `
      <div style="font-family:Arial, sans-serif;padding:20px;">
        <h2>Hey ${user.name},</h2>
        <p>This is a reminder for your <b>${sub.name}</b> subscription.</p>
        <ul>
          <li><b>Amount:</b> $${Number(sub.amount).toFixed(2)}</li>
          <li><b>Next Renewal:</b> ${new Date(sub.dueDate).toDateString()}</li>
        </ul>
        <p>Don't forget to review or renew on time!</p>
        <p style="color:#888;">- The SubTracker Team</p>
      </div>
    `;

    await sendEmailReminder(
      user.email,
      `Reminder: ${sub.name} Subscription`,
      html
    );

    res.json({ message: `✅ Reminder email sent to ${user.email}` });
  } catch (err) {
    console.error("Email reminder error:", err);
    res.status(500).json({ message: "Failed to send reminder email" });
  }
});
