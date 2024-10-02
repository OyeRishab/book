const express = require("express");
const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");

const router = express.Router();

// GET /reviews?bookId
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.query.bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { book, name, rating, comment } = req.body;
  try {
    const bookExists = await Book.findById(book);
    if (!bookExists) return res.status(404).json({ message: "Book not found" });

    const newReview = new Review({ book, name, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
