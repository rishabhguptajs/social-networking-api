import User from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    const user = await User.findById(decode.userId)
    console.log(user)
    console.log(decode)
    req.user = user
    
    next()
  } catch (error) {
    console.log(error)
  }
}
