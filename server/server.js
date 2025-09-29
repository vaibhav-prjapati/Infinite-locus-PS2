import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import startCancellationJob from './jobs/cancellationJob.js';

dotenv.config();

connectDB();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['https://infinite-locus-ps-2.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// API Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the cron job for cancelling stale orders
startCancellationJob();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);