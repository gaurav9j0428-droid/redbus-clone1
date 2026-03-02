const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// ⭐ ADD REVIEW
router.post("/", async (req, res) => {
  try {

    const review = new Review({
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    });

    await review.save();
    res.json(review);

  } catch (err) {
    res.status(500).json(err);
  }
});

// ⭐ GET REVIEWS
router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
});

module.exports = router;