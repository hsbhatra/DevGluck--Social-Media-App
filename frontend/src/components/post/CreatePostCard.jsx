import React from "react";
import { ImageIcon } from "lucide-react";

const CreatePostCard = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 max-w-2xl mx-auto my-4">
      <div className="flex items-start space-x-3">
        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mt-1"
        />

        {/* Post Input Section */}
        <div className="flex-1 space-y-3">
          {/* Input */}
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm py-2"
          />

          {/* Bottom controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            {/* Add Media */}
            <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
              <ImageIcon className="w-4 h-4 mr-1" />
              Add Media
            </button>

            {/* Post Button */}
            <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 self-start sm:self-auto">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
