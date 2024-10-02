const express = require("express");
const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    const reviews = await Review.find({ book: req.params.id });
    res.json({ book, reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { title, author, description } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      description,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
