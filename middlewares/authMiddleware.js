import User from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        const user = await User.findById(decode.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // attach user object to the request
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};