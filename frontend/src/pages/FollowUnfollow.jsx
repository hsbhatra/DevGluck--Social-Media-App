import React, { useState } from 'react';
import { Search, Bell, Home, User, MessageSquare } from 'lucide-react';

const FollowUnfollowPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Olivia Anderson',
      role: 'Financial Analyst',
      avatar: '/api/placeholder/40/40',
      isFollowing: false
    },
    {
      id: 2,
      name: 'Thomas Baker',
      role: 'Project Manager',
      avatar: '/api/placeholder/40/40',
      isFollowing: true
    },
    {
      id: 3,
      name: 'Lily Lee',
      role: 'Graphic Designer',
      avatar: '/api/placeholder/40/40',
      isFollowing: false
    },
    {
      id: 4,
      name: 'Andrew Harris',
      role: 'Data Scientist',
      avatar: '/api/placeholder/40/40',
      isFollowing: true
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      role: 'Marketing Specialist',
      avatar: '/api/placeholder/40/40',
      isFollowing: false
    },
    {
      id: 6,
      name: 'Michael Chen',
      role: 'Software Developer',
      avatar: '/api/placeholder/40/40',
      isFollowing: true
    }
  ]);

  const toggleFollow = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-2 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-6xl mx-auto gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900">Social</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">Robert Fox</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">Software Engineer</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">12</div>
                  <div className="text-xs sm:text-sm text-gray-500">Posts</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">207</div>
                  <div className="text-xs sm:text-sm text-gray-500">Followers</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">64</div>
                  <div className="text-xs sm:text-sm text-gray-500">Following</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Navigation</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Home</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Messages</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Notifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">People You May Know</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Discover and connect with new people</p>
              </div>

              {/* Users Grid */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{user.role}</p>
                          <button
                            onClick={() => toggleFollow(user.id)}
                            className={`mt-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                              user.isFollowing
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {user.isFollowing ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUnfollowPage;