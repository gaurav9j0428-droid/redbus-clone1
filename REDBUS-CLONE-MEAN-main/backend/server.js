const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reviewRoutes = require("./routes/review");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route (Important)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "RedBus Clone Backend is running successfully 🚀",
    status: "OK"
  });
});

// API routes
app.use("/review", reviewRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// start server (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});