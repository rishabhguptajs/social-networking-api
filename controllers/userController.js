import User from "../models/userModel.js"
import { v4 as uuidv4 } from "uuid"

export const createUser = async (req, res) => {
  try {
    const { username, bio, profilePictureUrl, password } = req.body

    // generate a unique user ID using uuid
    const userId = uuidv4()

    // create a new user with the provided data from req.body
    const newUser = new User({
      username,
      bio,
      userId,
      profilePictureUrl,
      password,
    })

    const user = await newUser.save()
    res.status(201).json({
      message: "User created successfully",
      user: user,
    })
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const updateUser = async (req, res) => {
  try {
    // here finding the user by ID and updating the profile
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const getUser = async (req, res) => {
  try {
    // here finding the user by ID and returning the profile
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
  } catch (error) {
    console.error("Error retrieving user:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const deleteUser = async (req, res) => {
  try {
    // here finding the user by ID and deleting the profile
    await User.findByIdAndDelete(req.params.userId)
    res.status(204).send({
        message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    res.status(500).json({ error: "Server error" })
  }
}