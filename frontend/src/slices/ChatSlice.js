import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const listChat = createAsyncThunk(
    'chat/list',
    async (userId, thunkAPI) => {
        try {
            const config = tokenParser();
            const conversations = await axiosInstance.get('api/messages');
            console.log(conversations);
            return conversations.data.conversations;
        } catch (error) {
            console.error("ChatSlice: listChat error:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMessages = createAsyncThunk(
    'chat/getmsgs',
    async (recieverId, thunkAPI) => {
        try {
            const config = tokenParser();
            const response = await axiosInstance.get(`api/messages/all/${recieverId}`, config);
            return response.data.messages;
        } catch (error) {
            console.error("ChatSlice: getMessages error:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


const handleChatList = (chatResponse) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return chatResponse.map((chat) => {
        const check = chat?.participants[1]?._id === user?._id;
        return {
            messages: chat?.latestMessage?.message || "new message",
            username: (check) ? chat?.participants[0]?.username : chat?.participants[1]?.username,
            recipientId: (check) ? chat?.participants[0]?._id : chat?.participants[1]?._id,
            avatar: chat?.participants[1]?.avatar,
        }
    });
}

const initialState = {
    chatResponse: [],
    loading: false,
    chatList: [],
    selectedChatMessages: [],
    selectedChatId: null,
    onlineUsers: [],
    unreadMessages: {},
    socket: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // actions
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.selectedChatMessages = [];
        },
        receiveNewMessages: (state, action) => {
            const newMsg = action.payload;

            // 1. Check if current chat is open
            const isCurrentChat =
                state.selectedChatId &&
                (newMsg.senderId === state.selectedChatId || newMsg.receiverId === state.selectedChatId);

            if (isCurrentChat) {
                // Add message to currently selected chat
                const alreadyExists = state.selectedChatMessages.some(msg => msg._id === newMsg._id);
                if (!alreadyExists) {
                    state.selectedChatMessages.push(newMsg);
                }
            } else {
                // Increment unread count for the sender
                const senderId = newMsg.senderId;
                if (!state.unreadMessages[senderId]) state.unreadMessages[senderId] = 0;
                state.unreadMessages[senderId]++;
            }

            // 2. Update chat list order (move chat to top)
            const chatIndex = state.chatList.findIndex(
                chat =>
                    chat.recipientId === newMsg.senderId || chat.recipientId === newMsg.receiverId
            );

            if (chatIndex !== -1) {
                const chat = state.chatList.splice(chatIndex, 1)[0];
                // Update last message text
                chat.messages = newMsg.message;
                state.chatList.unshift(chat); // Move to top
            }
        },
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
            // Reset unread count for this chat
            if (state.unreadMessages[action.payload]) {
                delete state.unreadMessages[action.payload];
            }
        },
        setSelectedChat: (state, action) => {
            state.selectedChatId = action.payload; // recipientId or userId of the open chat
        },
        createTempNewChat: (state, action) => {
            const tempUser = action.payload;
            const update = {
                ...tempUser,
                messages: [],
                recipientId: tempUser._id,
                isTemp: true
            };
            console.log("UPDATE: ", update);
            state.chatList.push(update);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(listChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(listChat.fulfilled, (state, action) => {
                const updatedList = handleChatList(action.payload);
                state.chatList = state.chatList
                    .filter(chat => chat.isTemp && !updatedList.some(c => c.recipientId === chat.recipientId))
                    .concat(updatedList);
                state.chatResponse = action.payload;
                state.loading = false;
            })
            .addCase(listChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.payload.message;
            })
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                if (action.payload.length === 0) {

                }
                state.selectedChatMessages = action.payload;
                // localStorage.setItem('selectedChat', JSON.stringify(action.payload));
                state.loading = false;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.payload.message;
            });
    }
});
export const {
    setOnlineUsers,
    setMessages,
    receiveNewMessages,
    createTempNewChat,
    setSelectedChat,
    setSelectedChatId,
    clearMessages } = chatSlice.actions;
export default chatSlice.reducer