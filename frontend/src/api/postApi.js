import axiosInstance from './axiosInstance.js';

// Post API service
export const postApi = {
  // Create a new post
  createPost: async (postData) => {
    try {
      const response = await axiosInstance.post('/api/posts/addpost', postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await axiosInstance.get('/api/posts/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user posts
  getUserPosts: async (userId = null) => {
    try {
      const url = userId ? `/api/posts/userpost/${userId}` : '/api/posts/userpost';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Like/unlike a post
  likePost: async (postId) => {
    try {
      const response = await axiosInstance.post(`/api/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add comment to a post
  addComment: async (postId, commentText) => {
    try {
      const response = await axiosInstance.post(`/api/posts/${postId}/comment`, {
        text: commentText
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get comments for a post
  getComments: async (postId) => {
    try {
      const response = await axiosInstance.get(`/api/posts/${postId}/comment/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      const response = await axiosInstance.delete(`/api/posts/delete/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 