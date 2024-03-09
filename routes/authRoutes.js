import express from "express";
import { login, register } from "../controllers/authController.js";

// Create a new Express router instance
const router = express.Router();

// Define routes for user registration and login
router.post("/register", register); // Route for user registration
router.post("/login", login); // Route for user login

// Export the router for use in other parts of the application
export default router;
