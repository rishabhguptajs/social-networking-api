import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Middleware to check if user is signed in
export const requireSignIn = async (req, res, next) => {
  try {
    // Verify JWT token from authorization header
    const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    
    // Find user by decoded user ID
    const user = await User.findById(decoded.userId);
    
    // Attach user object to request object
    req.user = user;
    
    // Move to the next middleware
    next();
  } catch (error) {
    console.error(error);
    // Handle errors if JWT token is invalid or user is not found
    res.status(401).json({ message: "Unauthorized" });
  }
};
