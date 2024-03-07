import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema)