import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.js';
import chatReducer from './slices/ChatSlice.js';
import searchReducer from './slices/SearchSlice.js';
import postReducer from './slices/PostSlice.js';
// import socketReducer from './slices/SocketSlice.js';

const store = configureStore({
        reducer: {
                users: userReducer,
                chat: chatReducer,
                search: searchReducer,
                posts: postReducer,
                // socket: socketReducer,
        }
});



export default store;