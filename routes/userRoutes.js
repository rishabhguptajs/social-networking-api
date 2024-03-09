import express from 'express';
import {
  createUser,
  deleteUser,
  getFollowers,
  getFollowing,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { viewLatestPosts } from '../controllers/postController.js';

// Create a new Express router instance
const router = express.Router();

// Define routes for user-related operations
router.post('/create', createUser); // Route for creating a new user
router.put('/update/:userId', updateUser); // Route for updating user profile
router.get('/get/:userId', getUser); // Route for retrieving user profile
router.delete('/delete/:userId', deleteUser); // Route for deleting user profile

// Route to get followers list for the logged-in user
router.get('/followers', requireSignIn, getFollowers);

// Route to get following list for the logged-in user
router.get('/following', requireSignIn, getFollowing);

// Route to view the latest posts from followed users
router.get('/latest-posts', requireSignIn, viewLatestPosts);

// Export the router for use in other parts of the application
export default router;
