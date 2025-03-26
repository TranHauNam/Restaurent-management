const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
const database = require("../backend/config/database");
database.connect();

// Test API
app.get("/", (req, res) => {
  res.send("Backend đang chạy...");
});

// Lắng nghe cổng 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
