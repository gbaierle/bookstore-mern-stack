import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send('Bookstore API');
})

app.listen(3000, () => console.log('Server started on port 3000'));
