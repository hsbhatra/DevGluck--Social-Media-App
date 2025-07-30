// Fixed and cleaned-up version of the MessagesUI component
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listChat,
  getMessages,
  receiveNewMessages,
  setOnlineUsers,
  createTempNewChat,
  setSelectedChat,
  setSelectedChatId,
  clearMessages
} from "../../slices/ChatSlice";
import { motion, AnimatePresence } from "framer-motion";
import socket from "./socket.jsx";
import Search from "../search/Search.jsx";


export default function MessagesUI() {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const loading = useSelector((state) => state.chat.loading);
  const messages = useSelector((state) => state.chat.selectedChatMessages);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const unreadMessages = useSelector((state) => state.chat.unreadMessages);
  const [selected, setSelected] = useState({});
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [input, setInput] = useState("");
  // const eventBound = useRef(false);

  useEffect(() => {
    console.log("Messages UE 1", user?._id);
    if (user?._id) {
      if (!socket.connected) {
        socket.connect();
        console.log("Socket connected after login");
      }
      dispatch(listChat());
      socket.emit("registerUser", user._id);
    }
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    socket.on("receiveMessage", (message) => {
      console.log(message, "msg2");
      dispatch(receiveNewMessages(message));
      dispatch(listChat());
    });

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("getOnlineUsers");
    };
  }, []);

  useEffect(() => {
    if (selected?.isTemp) {
      const realChat = chatList.find(
        (chat) => chat.recipientId === selected.recipientId && !chat.isTemp
      );
      if (realChat) {
        setSelected(realChat);
      }
    }
  }, [chatList]);

  const handleChatSelect = async (contact) => {
    dispatch(getMessages(contact.recipientId));
    dispatch(setSelectedChatId(contact.recipientId));
    setSelected(contact);
  };

  const handleTempChatSelect = async (user) => {
    dispatch(createTempNewChat(user));
    dispatch(getMessages(user._id));
    dispatch(setSelectedChat(user._id));
    setSelected(user);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      console.log("Leaving Messages page, clearing selection...");
      setSelected({});
      dispatch(setSelectedChatId(null));
      dispatch(setSelectedChat([]));
      dispatch(clearMessages()); // Clears the Redux messages
    };
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      senderId: user?._id,
      receiverId: selected?.recipientId || selected?._id,
      message: input,
    };

    socket.emit("sendMessage", messageData, () => {
      dispatch(listChat());
    });
    setInput("");
  };

  return (
    <motion.div
      className="flex h-screen border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeIn" }}
    >
      {/* Sidebar */}
      <div className="w-20 sm:w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-2 sm:p-4 font-bold text-lg border-b border-gray-200 hidden sm:block">
          Messages
        </div>
        <Search handleSelect={handleTempChatSelect} />
        <div className="flex-1 overflow-auto w-full">
          {chatList.map((contact) => {
            const isUnread = unreadMessages[contact.recipientId] > 0;

            return (
              <div
                key={contact.recipientId}
                className={`flex items-center gap-2 p-2 cursor-pointer transition-colors
            ${selected.recipientId === contact.recipientId ? "bg-gray-100" : ""}
            ${isUnread ? "font-bold text-black" : "text-gray-500"}
          `}
                onClick={() => handleChatSelect(contact)}
              >
                <img
                  src={contact.avatar}
                  alt={contact.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden sm:block min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{contact.username}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {contact.messages || "No messages yet"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">

        {(selected?._id || selected?.recipientId) ? (
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
            <AnimatePresence mode="wait">
              <div className="flex items-center gap-3">
                <img
                  src={selected.avatar}
                  alt={selected.username}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{selected.username}</h3>

                  {onlineUsers.includes(selected.recipientId || selected._id) ? <p className="text-xs text-green-500 truncate">Online</p> : <p className="text-xs text-gray-500 truncate">Offline</p>}

                </div>
              </div>

            </AnimatePresence>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">Select a chat to start messaging</div>
        )}

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          <AnimatePresence>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.senderId === user?._id ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.05, ease: 'easeInOut' }}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-3 py-2 rounded-lg text-sm break-words ${message.senderId === user?._id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                      }`}
                  >
                    {message.message}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-gray-500 text-center text-sm">No messages yet</div>
            )}
          </AnimatePresence>
        </div>

        {(selected?._id || selected?.recipientId) && (
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${input.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}