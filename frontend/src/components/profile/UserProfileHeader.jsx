import React from "react";
import { Bookmark, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfileHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Profile Info Section */}
      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:space-x-4 w-full">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mb-2 md:mb-0"
          onError={(e) => { e.target.onerror = null; e.target.src = '/general/avatar.png'; }}
        />
        <div className="space-y-1 w-full">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Robert Fox</h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">@robert</p>
          <p className="text-xs sm:text-sm text-gray-600">Software Engineer</p>
        </div>
      </div>

      {/* Stats Section - Below profile info on mobile, to the right on desktop */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 w-full mt-4 md:mt-0 md:ml-auto md:w-auto">
        <div className="text-center min-w-[70px]">
          <p className="text-base sm:text-lg font-semibold text-gray-800">12</p>
          <p className="text-xs sm:text-sm text-gray-500">Posts</p>
        </div>
        <div className="text-center min-w-[70px]">
          <p className="text-base sm:text-lg font-semibold text-gray-800">207</p>
          <p className="text-xs sm:text-sm text-gray-500">Followers</p>
        </div>
        <div className="text-center min-w-[70px]">
          <p className="text-base sm:text-lg font-semibold text-gray-800">64</p>
          <p className="text-xs sm:text-sm text-gray-500">Following</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Action Buttons - stacked on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/user-posts')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition w-full sm:w-auto text-sm"
          >
            My Posts
          </button>
          <button 
            onClick={() => navigate('/saved-posts')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition w-full sm:w-auto text-sm"
          >
            Saved Posts
          </button>
          <button 
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition w-full sm:w-auto text-sm"
          >
            Edit Profile
          </button>
        </div>
        <button
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium w-full sm:w-auto justify-center text-sm"
        >
          <span className="hidden sm:inline">+</span>
          <span>Add</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-t pt-4 hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <button className="hover:text-black">My Posts</button>
        <button className="hover:text-black">Saved Posts</button>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden mt-6 border-t pt-4 flex justify-around text-gray-600">
        <button className="flex flex-col items-center">
          <Grid3x3 className="w-5 h-5" />
          <span className="text-xs mt-1">Posts</span>
        </button>
        <button className="flex flex-col items-center">
          <Bookmark className="w-5 h-5" />
          <span className="text-xs mt-1">Saved</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfileHeader;
