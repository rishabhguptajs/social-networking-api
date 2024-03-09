// followController.js

import User from "../models/userModel.js"

export const followUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = req.user._id; // Extracted from authentication middleware

    // Check if the user is already being followed
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.followers.includes(followerId)) {
      return res.status(400).json({ message: "You already follow this user" });
    }

    // Update the user's followers and the follower's following list
    await user.updateOne({ $push: { followers: followerId } });
    await User.findByIdAndUpdate(followerId, { $push: { following: userId } });

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = req.user.userId; // Extracted from authentication middleware

    // Check if the user is already being followed
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.followers.includes(followerId)) {
      return res.status(400).json({ message: "You do not follow this user" });
    }

    // Update the user's followers and the follower's following list
    await user.updateOne({ $pull: { followers: followerId } });
    await User.findByIdAndUpdate(followerId, { $pull: { following: userId } });

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Server error" });
  }
}
