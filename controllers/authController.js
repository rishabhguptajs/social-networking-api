import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      bio: req.body.bio,
      profilePictureUrl: req.body.profilePictureUrl,
      password: hashedPassword,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

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
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
  
      // respond with token
      res.status(200).json({ 
        message: 'Login successful',
        token: token,
        user: user
       });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Server error' });
    }
;}