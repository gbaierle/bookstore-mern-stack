import express from 'express';
import mongoose from 'mongoose';
import books from './routes/books';

const app = express();

// Middleware to parse JSON request bodies.
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send('Bookstore API');
})

app.use('/books', books);

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/bookstore';

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch((err) => console.log(err));
