import React from 'react';
import { Link } from 'react-router-dom';
import UserProfileHeader from '../components/profile/UserProfileHeader';
import Feed from '../components/feed/Feed';
import FollowersFollowing from '../components/feed/FollowersFollowing';

const UserPersonalPosts = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-6">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">Robert Fox</h3>
                <p className="text-sm text-gray-500 mb-4">Software Engineer</p>
                
                {/* Stats */}
                <div className="flex justify-around w-full text-center border-t pt-4">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">12</p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">207</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">64</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="mt-6 space-y-2">
                <Link to="/posts" className="w-full text-left px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"/>
                  </svg>
                  <span className="hidden sm:inline">Home</span>
                </Link>
                
                <Link to="/profile" className="w-full text-left px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                
                <Link to="/blogs" className="w-full text-left px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="hidden sm:inline">Messages</span>
                </Link>
                
                <div className="w-full text-left px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-3 text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                  <span className="hidden sm:inline">Notifications</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Profile Header */}
            <UserProfileHeader />
            
            {/* Feed */}
            <div className="mt-4 sm:mt-6">
              <Feed />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <FollowersFollowing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPersonalPosts;
