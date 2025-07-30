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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900">Social</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Robert Fox</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Suggested Friends</h2>
                <p className="text-sm text-gray-500 mt-1">Connect with people you might know</p>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleFollow(user.id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          user.isFollowing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {user.isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="mt-6 text-center">
                  <button className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors">
                    Load More Suggestions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2023 DevCut. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-700">About</a>
              <a href="#" className="hover:text-gray-700">Help</a>
              <a href="#" className="hover:text-gray-700">Privacy & Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FollowUnfollowPage;