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

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/bookstore';

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch((err) => console.log(err));
