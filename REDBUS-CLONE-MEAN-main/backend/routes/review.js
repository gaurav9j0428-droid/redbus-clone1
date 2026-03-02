const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// GET reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
});

// ADD review
router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
});

module.exports = router;