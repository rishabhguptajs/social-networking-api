import express from 'express';
import { followUser, unfollowUser } from '../controllers/followController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

// Create a new Express router instance
const router = express.Router();

// Define routes for following and unfollowing users
router.post('/follow/:userId', requireSignIn, followUser); // Route for following a user
router.post('/unfollow/:userId', requireSignIn, unfollowUser); // Route for unfollowing a user

// Export the router for use in other parts of the application
export default router;
