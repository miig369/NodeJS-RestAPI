import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = 8080;

dotenv.config();
connectDB();

app.use(express.json());

//routes
app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log('server started at ' + PORT);
});
