import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';

// Create a new Express router instance
const router = express.Router();

// Define routes for creating, retrieving, updating, and deleting posts
router.post('/create', requireSignIn, createPost); // Route for creating a new post
router.get('/get', requireSignIn, getPosts); // Route for retrieving all posts
router.put('/update/:postId', requireSignIn, updatePost); // Route for updating a post
router.delete('/delete/:postId', requireSignIn, deletePost); // Route for deleting a post

// Export the router for use in other parts of the application
export default router;
