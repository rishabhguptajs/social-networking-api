// postRoutes.js

import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Create a new post
router.post('/create', requireSignIn, createPost);

// Get all posts
router.get('/get', requireSignIn, getPosts);

// Update a post
router.put('/update/:postId', requireSignIn, updatePost);

// Delete a post
router.delete('/delete/:postId', requireSignIn, deletePost);

export default router;
