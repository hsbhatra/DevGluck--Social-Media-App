import React from "react";


const MessageCard = () => {
  const user = {
    name: "Bessie Cooper",
    message: "Hi, Robert. I'm facing some challenge with the new feature implementation. Can we talk?",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    isOnline: true,
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer w-full max-w-full">
      {/* Avatar with Online Dot */}
      <div className="relative flex-shrink-0">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <p className="font-medium text-sm sm:text-base text-gray-900">{user.name}</p>
        <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem]">
          {user.message}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
