import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Dummy data to test
// const mockFormData = {
//   firstName: "John",
//   lastName: "Doe",
//   username: "johndoe",
//   email: "john@example.com",
//   password: "password123",
// };

// return new Promise((resolve) => {
//   setTimeout(() => {
//     const mockResponse = {
//       id: Date.now(),
//       ...mockFormData,
//       token: 'mock-jwt-token',
//     };
//     sessionStorage.setItem('currentUser', JSON.stringify(mockResponse));
//     resolve(mockResponse);
//   }, 1000); // 1 second delay
// })

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/auth/signup', formData);
      console.log("UserSlice: signUpUser response:", response.data);
      return response.data;
    } catch (error) {
      console.error("UserSlice: signUpUser error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }

  }
);

export const signInUser = createAsyncThunk(
  'user/signin',
  async (formData, thunkAPI) => {
    const response = await axiosInstance.post('/api/auth/login', formData);
    return response.data;
  }
);

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      console.log("User loaded from storage:", state);
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      console.log("User cleared:", state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        // Handle the response structure from backend
        const response = action.payload;
        const userData = {
          ...response.user,
          token: response.token
        };
        state.currentUser = userData;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log("User set:", state);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.payload.message;
        console.log("Error setting user:", state.error);
      })

      // Sign In
      .addCase(signInUser.pending, (state) => {
        console.log("Signing in...");
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        // Handle the response structure from backend
        const response = action.payload;
        const userData = {
          ...response.user,
          token: response.token
        };
        state.currentUser = userData;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log("User signed in:", state);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Error signing in:", state.error);
      });
  },
});

export const { clearUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.users.currentUser;
export default userSlice.reducer;