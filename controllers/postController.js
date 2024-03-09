import Post from "../models/postSchema.js"

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const id = req.user._id; // Extracted from authentication middleware

    // Create a new post object
    const newPost = new Post({
      content: textContent,
      id_of_user_here: id,
      createdAt: new Date(),
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("id_of_user_here", "username"); // Populate user field with username
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const postId = req.params.postId;

    // Find the post by ID and update its text content
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content: textContent },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by ID and delete it
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// View latest posts from followed users
export const viewLatestPosts = async (req, res) => {
  try {
    // Retrieve the list of users that the current user follows
    const user = req.user; // Assuming req.user contains the details of the logged-in user
    const followedUsers = user.following;

    // Retrieve the latest posts from each followed user
    const latestPostsPromises = followedUsers.map(async (userId) => {
      const posts = await Post.find({ id_of_user_here: userId })
        .sort({ createdAt: -1 })
        .limit(10);
      return posts;
    });

    // Wait for all promises to resolve
    const latestPostsArray = await Promise.all(latestPostsPromises);

    // Flatten the array of arrays into a single array of posts
    let latestPosts = [].concat(...latestPostsArray);

    // Sort the combined posts by createdAt timestamp in descending order
    latestPosts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ latestPosts });
  } catch (error) {
    console.error('Error retrieving latest posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
