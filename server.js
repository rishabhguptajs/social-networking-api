import express from "express"
import morgan from "morgan"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import rateLimit from "express-rate-limit"

dotenv.config()

const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
})

connectDB()

app.use(express.json())
app.use(morgan("common"))
app.use(limiter)

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/routes", followRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
