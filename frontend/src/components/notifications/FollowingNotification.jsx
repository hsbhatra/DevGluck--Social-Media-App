import React from "react";

const FollowNotification = () => {
  const user = {
    name: "Bessie Cooper",
    message: "Start following you",
    time: "7 hours ago",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  };

  return (
    <div className="space-y-4 p-4">
      {/* For Normal Screens */}
      <div className="hidden sm:flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm text-gray-700">
            <span className="font-medium">{user.name}</span> {user.message}.
          </p>
        </div>
        <span className="text-xs text-gray-500">{user.time}</span>
      </div>

      {/* For Smaller Screens */}
      <div className="flex sm:hidden items-start justify-between border-b pb-3">
        <img
          src={user.image}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">{user.name}</p>
            <span className="text-xs text-gray-500">{user.time}</span>
          </div>
          <p className="text-sm text-gray-600">{user.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowNotification;
