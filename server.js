import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import followRoutes from './routes/followRoutes.js';
import rateLimit from 'express-rate-limit';

// Load environment variables from .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

// Connect to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('common')); // Log HTTP requests
app.use(limiter); // Apply rate limiter

// Route handling
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User-related routes
app.use('/api/post', postRoutes); // Post-related routes
app.use('/api/routes', followRoutes); // Follow/unfollow routes

// Define the port to listen on
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
