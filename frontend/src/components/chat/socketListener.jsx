import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { receiveNewMessages } from "../../slices/ChatSlice";
import socket from "./socket";

export default function SocketListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            console.log("📩 Global listener received message:", message);
            dispatch(receiveNewMessages(message)); // Updates unreadMessages in Redux
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [dispatch]);

    return null; // This component doesn't render anything
}
