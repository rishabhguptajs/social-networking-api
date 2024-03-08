import Post from "../models/postSchema.js"

export const createPost = async (req, res) => {
    try {
      const { textContent } = req.body;
    //   const userId = req.user._id; // Extract user ID from authentication token
  
      // Create a new post associated with the user ID
      const newPost = new Post({
        content: textContent,
        // user: userId,
      });
  
      // Save the post to the database
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username") // Populate user field with username
    res.status(200).json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { textContent } = req.body
    const postId = req.params.postId

    // Find the post by ID and update its text content
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
    { content: textContent },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the post by ID and delete it
      await Post.findByIdAndDelete(postId);
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };