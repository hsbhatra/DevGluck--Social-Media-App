import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

const tokenParser = () => {
    // Token can be get from state in future
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.token;
    if (!token) {
        return thunkAPI.rejectWithValue("User not authenticated");
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return config;
}

export const searchUser = createAsyncThunk(
    'search/search',
    async (formData, thunkAPI) => {
        try {
            const config = tokenParser();
            const response = await axiosInstance.get(`api/users/search?search=${formData}`, config);
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data);
        }

    }
)

const initialState = {
    searchData: [],
    loading: false,
    error: false
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(searchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.searchData = action.payload;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.loading = false;
                state.searchData = [];
                state.error = action.payload;
            })

    }
}
)

export const { resetSearchData } = searchSlice.actions;
export default searchSlice.reducer;