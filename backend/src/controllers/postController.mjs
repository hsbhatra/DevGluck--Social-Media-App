import { Post } from "../models/postModel.mjs";
import { Like } from "../models/likeModel.mjs";
import { Comment } from "../models/commentModel.mjs";
import { uploadImage } from "../aws/aws.mjs";

// Create a new post
export const addNewPost = async (req, res) => {
  try {
    console.log("Post creation request:", {
      body: req.body,
      file: req.file ? { 
        originalname: req.file.originalname, 
        mimetype: req.file.mimetype, 
        size: req.file.size 
      } : null,
      user: req.user._id
    });

    const { content } = req.body;
    const author = req.user._id;
    
    if (!content && !req.file) {
      return res.status(400).json({ message: "Post content or media required." });
    }

    let mediaUrl = null; // No default image when no file is uploaded
    
    // Handle file upload
    if (req.file) {
      try {
        console.log("Processing file upload...");
        console.log("Using AWS S3 upload...");
        mediaUrl = await uploadImage(req.file);
        console.log("S3 upload successful:", mediaUrl);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        console.log("Falling back to base64 storage...");
        
        // Fallback to base64 storage
        const base64Data = req.file.buffer.toString('base64');
        const mimeType = req.file.mimetype;
        mediaUrl = `data:${mimeType};base64,${base64Data}`;
        console.log("Base64 fallback successful");
      }
    }

    console.log("Creating post with media URL:", mediaUrl);
    const postData = {
      author,
      content,
    };
    
    // Only add media field if an image was uploaded
    if (mediaUrl) {
      postData.media = mediaUrl;
    }
    
    const post = await Post.create(postData);
    
    // Populate author info before sending response
    await post.populate("author", "firstName lastName avatar username");
    // Add name field to author for frontend compatibility
    if (post.author) {
      post.author.name = `${post.author.firstName} ${post.author.lastName}`;
    }
    console.log("Post created successfully:", post._id);
    res.status(201).json(post);
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ 
      message: "Failed to create post", 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName avatar username");
    
    // Add name field to each post's author for frontend compatibility
    posts.forEach(post => {
      if (post.author) {
        post.author.name = `${post.author.firstName} ${post.author.lastName}`;
      }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

// Get all posts by a user
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const posts = await Post.find({ author: userId, isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName avatar username");
    
    // Add name field to each post's author for frontend compatibility
    posts.forEach(post => {
      if (post.author) {
        post.author.name = `${post.author.firstName} ${post.author.lastName}`;
      }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user posts", error: err.message });
  }
};

// Delete a post (soft delete)
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post." });
    }
    post.isDeleted = true;
    await post.save();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    const existingLike = await Like.findOne({ userId, refId: postId, refType: "Post" });
    if (existingLike) {
      // Unlike
      await existingLike.deleteOne();
      post.likes = Math.max(0, post.likes - 1);
      await post.save();
      return res.json({ liked: false, likes: post.likes });
    } else {
      // Like
      await Like.create({ userId, refId: postId, refType: "Post" });
      post.likes += 1;
      await post.save();
      return res.json({ liked: true, likes: post.likes });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to like/unlike post", error: err.message });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text required." });
    }
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    const comment = await Comment.create({ postId, userId, text });
    post.comments += 1;
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

// Get all comments for a post
export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId, isDeleted: false })
      .sort({ createdAt: 1 })
      .populate("userId", "firstName lastName avatar username");
    
    // Add name field to each comment's user for frontend compatibility
    comments.forEach(comment => {
      if (comment.userId) {
        comment.userId.name = `${comment.userId.firstName} ${comment.userId.lastName}`;
      }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};
