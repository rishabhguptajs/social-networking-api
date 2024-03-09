import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import followRoutes from "./routes/followRoutes.js"

dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(morgan("common"))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/routes", followRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
