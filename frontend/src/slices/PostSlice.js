import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../api/postApi.js';

// Async thunks
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.getAllPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await postApi.getUserPosts(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postApi.createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create post');
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.likePost(postId);
      return { postId, ...response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to like post');
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, commentText }, { rejectWithValue }) => {
    try {
      const response = await postApi.addComment(postId, commentText);
      return { postId, comment: response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add comment');
    }
  }
);

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.getComments(postId);
      return { postId, comments: response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await postApi.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete post');
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  userPosts: [],
  comments: {},
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  likeLoading: {},
  commentLoading: {},
};

// Post slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.userPosts = [];
    },
    setLikeLoading: (state, action) => {
      const { postId, loading } = action.payload;
      state.likeLoading[postId] = loading;
    },
    setCommentLoading: (state, action) => {
      const { postId, loading } = action.payload;
      state.commentLoading[postId] = loading;
    },
  },
  extraReducers: (builder) => {
    // Fetch all posts
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch user posts
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        state.posts.unshift(action.payload);
        state.userPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });

    // Like post
    builder
      .addCase(likePost.pending, (state, action) => {
        const postId = action.meta.arg;
        state.likeLoading[postId] = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, liked, likes } = action.payload;
        state.likeLoading[postId] = false;
        
        // Update in posts array
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = likes;
          state.posts[postIndex].isLiked = liked;
        }
        
        // Update in userPosts array
        const userPostIndex = state.userPosts.findIndex(post => post._id === postId);
        if (userPostIndex !== -1) {
          state.userPosts[userPostIndex].likes = likes;
          state.userPosts[userPostIndex].isLiked = liked;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.likeLoading[postId] = false;
      });

    // Add comment
    builder
      .addCase(addComment.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentLoading[postId] = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        state.commentLoading[postId] = false;
        
        // Add comment to comments object
        if (!state.comments[postId]) {
          state.comments[postId] = [];
        }
        state.comments[postId].push(comment);
        
        // Update comment count in posts
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments += 1;
        }
        
        const userPostIndex = state.userPosts.findIndex(post => post._id === postId);
        if (userPostIndex !== -1) {
          state.userPosts[userPostIndex].comments += 1;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentLoading[postId] = false;
      });

    // Fetch comments
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
      });

    // Delete post
    builder
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload;
        state.posts = state.posts.filter(post => post._id !== deletedPostId);
        state.userPosts = state.userPosts.filter(post => post._id !== deletedPostId);
      });
  },
});

export const { clearError, clearPosts, setLikeLoading, setCommentLoading } = postSlice.actions;
export default postSlice.reducer;
