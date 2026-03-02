const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reviewRoutes = require("./routes/review");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/review", reviewRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
