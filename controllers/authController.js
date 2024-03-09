import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, password, bio, profilePictureUrl } = req.body;
    const userId = uuidv4();

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      userId: userId,
      username,
      password: hashedPassword,
      bio,
      profilePictureUrl
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    // Handle errors
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
export const login = async (req, res) => {
  try {
    // retrieve the user from the database based on the provided username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // compare the hashed password stored in the database with the password provided during login
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // respond with token and user information
    res.status(200).json({ 
      message: 'Login successful',
      token: token,
      user: user
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
