import Post from "../models/postSchema.js"

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { textContent } = req.body
    const id = req.user.userId // Extracted from authentication middleware

    // Create a new post object
    const newPost = new Post({
      content: textContent,
      id_of_user_here: id,
      createdAt: new Date(),
    })

    // Save the post to the database
    const savedPost = await newPost.save()

    res.status(201).json(savedPost)
  } catch (error) {
    console.error("Error creating post:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("id_of_user_here", "username") // Populate user field with username
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
    const postId = req.params.postId

    // Find the post by ID and delete it
    await Post.findByIdAndDelete(postId)

    res.status(200).json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    res.status(500).json({ error: "Server error" })
  }
}
