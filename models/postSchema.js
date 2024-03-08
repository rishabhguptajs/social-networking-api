import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  id_of_user_here: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date },
})

export default mongoose.model("Post", postSchema)
