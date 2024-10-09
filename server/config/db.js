const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      // "mongodb+srv://marketplace:marketplace@cluster0.qp0lqio.mongodb.net/?retryWrites=true&w=majority",
      "mongodb://127.0.0.1:27017/menu-managment"
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
