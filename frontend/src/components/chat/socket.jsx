import { io } from 'socket.io-client';

const user = JSON.parse(localStorage.getItem("currentUser"));
console.log("Current user:", user?.user?._id);

const socket = io("http://localhost:8000", {
    query: {
        userId: user?.user?._id,
    },
    transports: ['websocket'],
    withCredentials: true,
})

export default socket;