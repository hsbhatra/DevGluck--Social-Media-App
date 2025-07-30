import React from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";

const PostCard = () => {
  // Hardcoded post data
  const post = {
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    userName: "Bessie Cooper",
    userRole: "Digital Marketer",
    time: "7 hours ago",
    content:
      "In today's fast-paced, digitally driven world, digital marketing is not just a strategy; it's a necessity for businesses of all sizes. 📈",
    image: "https://via.placeholder.com/500x300", // remove or comment this line to test post without image
    likes: 270,
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 max-w-xl mx-auto my-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <img
            src={post.userImage}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-medium">{post.userName}</h4>
            <p className="text-xs text-gray-500">{post.userRole}</p>
          </div>

        </div>
        <div className="text-xs text-gray-500 flex-shrink-0">{post.time}</div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800 mt-4">{post.content}</p>

      {/* Optional Image */}
      {post.image && (
        <div className="mt-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-md border object-cover"
          />
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.likes} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

