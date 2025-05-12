const mongoose = require("mongoose");
require("dotenv").config(); // Loads variables from .env

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connection Successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error(error);
  }
};

module.exports = databaseConnection;
