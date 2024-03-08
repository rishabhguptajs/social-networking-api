import express from "express"
import { login, register } from "../controllers/authController.js"
import {
  createUser,
  deleteUser,
  followUser,
  getUser,
  updateUser,
} from "../controllers/userController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Create a new user
router.post("/create", createUser)

// Update user profile
router.put("/update/:userId", updateUser)

// Get user profile
router.get("/:userId", getUser)

// Delete user profile
router.delete("/delete/:userId", deleteUser)

// Follow a user
router.post('/follow/:userId', requireSignIn, followUser);

// Unfollow a user
// router.post('/unfollow/:userId', requireSignIn, unfollowUser);

// Get following list
// router.get('/following', requireSignIn, getFollowing);

// Get followers list
// router.get('/followers', requireSignIn, getFollowers);

export default router
