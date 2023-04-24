import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
const PORT = 8080;

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/greeting', (req, res) => {
  res.send('hi there');
});
app.listen(PORT, () => {
  console.log('server started at ' + PORT);
});
