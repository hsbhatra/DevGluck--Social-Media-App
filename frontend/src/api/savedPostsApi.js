import axiosInstance from "./axiosInstance.js";

// Save or unsave a post
export const savePost = async (postId) => {
  try {
    const response = await axiosInstance.post(`/api/posts/${postId}/save`);
    return response.data;
  } catch (error) {
    console.error("Error saving/unsaving post:", error);
    throw error.response?.data || error;
  }
};

// Get all saved posts for the current user
export const getSavedPosts = async () => {
  try {
    const response = await axiosInstance.get("/api/posts/saved");
    return response.data;
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw error.response?.data || error;
  }
};
