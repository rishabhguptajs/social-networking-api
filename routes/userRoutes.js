import express from "express"
import { login, register } from "../controllers/authController.js"
import {
  createUser,
  deleteUser,
  getFollowers,
  getFollowing,
  getUser,
  updateUser,
} from "../controllers/userController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js"
import { viewLatestPosts } from "../controllers/postController.js"

const router = express.Router()

// Create a new user
router.post("/create", createUser)

// Update user profile
router.put("/update/:userId", updateUser)

// Get user profile
router.get("/get/:userId", getUser)

// Delete user profile
router.delete("/delete/:userId", deleteUser)

// Get followers list for the logged-in user
router.get('/followers', requireSignIn, getFollowers);

// Get following list for the logged-in user
router.get('/following', requireSignIn, getFollowing);

// Endpoint to view the latest posts from followed users
router.get('/latest-posts', requireSignIn, viewLatestPosts);


export default router
