import express from "express";
import { Book } from '../models/book';

const router = express.Router();

// Get all books.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get book by id.
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).json(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new book.
router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update book.
router.put("/:id", async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete book.
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
