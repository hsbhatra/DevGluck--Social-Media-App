import React from "react";
import { Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-full w-full max-w-xl shadow-sm bg-white border">
      {/* Profile Image */}
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Input Field */}
      <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 flex-grow">
        <input
          type="text"
          placeholder="Message ..."
          className="bg-transparent outline-none text-sm sm:text-base w-full"
        />
        <Send
          size={18}
          className="text-gray-500 hover:text-blue-500 cursor-pointer ml-2"
        />
      </div>
    </div>
  );
};

export default MessageInput;
