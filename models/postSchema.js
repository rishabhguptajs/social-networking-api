import mongoose from 'mongoose';

// Define the post schema
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  id_of_user_here: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for createdAt field
  },
});

// Create and export the Post model
export default mongoose.model('Post', postSchema);
