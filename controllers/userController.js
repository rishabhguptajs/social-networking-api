import User from "../models/userModel.js"
import { v4 as uuidv4 } from "uuid"

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, bio, profilePictureUrl, password } = req.body;

    // Generate a unique user ID using uuid
    const userId = uuidv4();

    // Create a new user with the provided data from req.body
    const newUser = new User({
      userId,
      username,
      bio,
      profilePictureUrl,
      password,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update user profile
export const updateUser = async (req, res) => {
  try {
    // Find the user by ID and update the profile
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get user profile
export const getUser = async (req, res) => {
  try {
    // Find the user by ID and return the profile
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete user profile
export const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and delete the profile
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get followers list for the logged-in user
export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "followers",
      "username"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.followers) {
      return res.status(200).json({ followers: [] }); // Return an empty array if followers list is null
    }
    res.status(200).json({ followers: user.followers });
  } catch (error) {
    console.error("Error retrieving followers:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get following list for the logged-in user
export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "following",
      "username"
    );
    res.status(200).json({ following: user.following });
  } catch (error) {
    console.error("Error retrieving following:", error);
    res.status(500).json({ error: "Server error" });
  }
}
