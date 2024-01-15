import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/book';

const app = express();

// Middleware to parse JSON request bodies.
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send('Bookstore API');
})

// Get all books.
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send(err);
  }
})

// Get book by id.
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    return res.status(200).json(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new book.
app.post('/books', async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    });
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update book.
app.put("/books/:id", async (req, res) => {
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

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/bookstore';

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch((err) => console.log(err));
