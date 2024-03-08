// postRoutes.js

import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Create a new post
router.post('/create', createPost);

// Get all posts
router.get('/get', getPosts);

// Update a post
router.put('/update/:postId', updatePost);

// Delete a post
router.delete('/delete/:postId', deletePost);

export default router;
