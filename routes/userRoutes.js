import express from "express";
import { login, register } from "../controllers/authController.js";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

// Create a new user
router.post('/create', createUser);

// Update user profile
router.put('/update/:userId', updateUser);

// Get user profile
router.get('/:userId', getUser);

// Delete user profile
router.delete('/delete/:userId', deleteUser);

export default router;