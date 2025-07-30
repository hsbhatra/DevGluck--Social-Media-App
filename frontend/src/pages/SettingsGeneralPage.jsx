import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SettingsGeneralPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">S</span>
                </div>
                <span className="font-semibold text-lg">Social</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-gray-500">
                <span>Profile</span>
                <span>—</span>
                <span>General</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap">Logout</button>
              <div className="w-8 h-8 bg-gray-300 rounded-full hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-6">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">Robert Fox</h3>
                <p className="text-sm text-gray-500">Software Engineer</p>
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
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Header */}
              <div className="p-4 sm:p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="Profile"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold truncate">Robert Fox</h2>
                      <p className="text-gray-500 text-sm">@robert</p>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex gap-4 sm:gap-8 text-center">
                    <div>
                      <p className="text-base sm:text-lg font-semibold">12</p>
                      <p className="text-xs sm:text-sm text-gray-500">Posts</p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold">207</p>
                      <p className="text-xs sm:text-sm text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold">64</p>
                      <p className="text-xs sm:text-sm text-gray-500">Following</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b overflow-x-auto">
                <button className="px-3 sm:px-6 py-3 text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap">My Posts</button>
                <button className="px-3 sm:px-6 py-3 text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap">Saved Posts</button>
                <button className="px-3 sm:px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium text-sm whitespace-nowrap">Settings</button>
              </div>

              {/* Settings Content */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Settings Sidebar */}
                  <div className="lg:w-1/3 lg:pr-6">
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm">General</button>
                      <button className="w-full text-left px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Account</button>
                      <button className="w-full text-left px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Logout</button>
                    </div>
                  </div>

                  {/* Settings Content */}
                  <div className="lg:w-2/3 lg:pl-6 lg:border-l">
                    <h3 className="text-lg font-semibold mb-6">Settings</h3>
                    
                    <div className="space-y-6">
                      {/* Avatar Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Choose an image for avatar
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="Current avatar"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Choose Image
                          </button>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        />
                      </div>

                      {/* Save Button */}
                      <div className="pt-4">
                        <button
                          onClick={handleSaveChanges}
                          className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Empty for this page */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">General Settings</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Update your profile information and preferences here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneralPage;
