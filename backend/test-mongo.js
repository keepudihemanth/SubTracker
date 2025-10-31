const mongoose = require('mongoose');

// Replace with your Atlas URI
const uri = "mongodb+srv://keepudihemanth6329_db_user:<zLYpyeaKW5YlRyrR>@subdb.g2qna0u.mongodb.net/?retryWrites=true&w=majority&appName=SubDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// Call the function
connectDB();
