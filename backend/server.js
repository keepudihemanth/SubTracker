// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscriptions");

const app = express();

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
