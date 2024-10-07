const express = require("express");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", menuRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
