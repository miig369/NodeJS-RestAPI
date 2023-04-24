import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/greeting', (req, res) => {
  res.send('hi there');
});
app.listen(PORT, () => {
  console.log('server started at ' + PORT);
});
