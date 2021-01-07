const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("Successfully connected!");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
