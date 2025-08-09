import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Camera } from "lucide-react";
import PostInput from "../components/feed/PostInput";
import UserPosts from "../components/feed/UserPosts";
import { ProfileContext } from "../profileContext.jsx";
import axiosInstance from "../api/axiosInstance.js";
import { updateUserProfile } from "../slices/UserSlice.js";

const ProfileHeader = ({ onAddClick, onEditProfile }) => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  // Use real user data or fallback to defaults
  const profile = {
    name: currentUser?.name || "User",
    username: currentUser?.username || "user",
    bio: currentUser?.bio || "No bio available",
    initials: currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U",
    avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    posts: currentUser?.posts || 0,
    followers: currentUser?.followers || 0,
    following: currentUser?.following || 0
  };
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Mobile Layout - Stack everything vertically */}
      <div className="block sm:hidden">
        {/* Profile Image and Info */}
        <div className="flex items-start space-x-4 mb-4">
          <motion.div 
            className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-yellow-200"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-xl">{profile.initials}</span>
              </div>
            )}
          </motion.div>
          <motion.div 
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-xl font-bold text-gray-900 mb-1 truncate">{profile.name}</h1>
            <p className="text-gray-600 text-sm mb-2 truncate">@{profile.username}</p>
            <p className="text-gray-500 text-sm break-words">{profile.bio}</p>
          </motion.div>
        </div>
        
        {/* Stats below bio on mobile */}
        <motion.div 
          className="flex justify-center space-x-8 text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xl font-bold text-gray-900">{profile.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xl font-bold text-gray-900">{profile.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xl font-bold text-gray-900">{profile.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout - Keep original side-by-side layout */}
      <div className="hidden sm:flex items-start justify-between mb-6">
        {/* Profile Image and Info */}
        <div className="flex items-start space-x-4">
          <motion.div 
            className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-yellow-200"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-2xl">{profile.initials}</span>
              </div>
            )}
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-gray-600 text-base mb-2">@{profile.username}</p>
            <p className="text-gray-500 text-base">{profile.bio}</p>
          </motion.div>
        </div>
        
        {/* Stats */}
        <motion.div 
          className="flex space-x-8 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-gray-900">{profile.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-gray-900">{profile.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-gray-900">{profile.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Separator Line */}
      <motion.div 
        className="border-t border-gray-200 mb-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      
      {/* Tabs and Add Button */}
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.button 
            onClick={() => navigate('/saved-posts')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Saved Posts
          </motion.button>
          <motion.button 
            onClick={onEditProfile}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Edit Profile
          </motion.button>
        </motion.div>
        <motion.button
          onClick={onAddClick}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Post Creation Modal Component
const PostCreationModal = ({ isOpen, onClose }) => {
  const handlePostCreated = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-lg">Create New Post</h3>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Post Input */}
              <div className="p-4">
                <PostInput
                  mode="modal"
                  onPostCreated={handlePostCreated}
                  showUserInfo={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProfilePage = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [editAvatar, setEditAvatar] = useState("");
  const [editBio, setEditBio] = useState("");
  const fileInputRef = useRef(null);

  // Initialize edit fields with current user data when modal opens
  useEffect(() => {
    if (showEditModal && currentUser) {
      setEditAvatar(currentUser.avatar || "");
      setEditBio(currentUser.bio || "");
    }
  }, [showEditModal, currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set maximum dimensions
          const maxWidth = 300;
          const maxHeight = 300;
          
          let { width, height } = img;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          setEditAvatar(compressedDataUrl);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    if (!currentUser) return;
    
    try {
      await dispatch(updateUserProfile({
        bio: editBio,
        avatar: editAvatar
      })).unwrap();
      
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error.message || error.error || "Failed to update profile. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ProfileHeader 
        onAddClick={() => setShowPostModal(true)} 
        onEditProfile={() => setShowEditModal(true)} 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <UserPosts />
      </motion.div>

      <PostCreationModal 
        isOpen={showPostModal} 
        onClose={() => setShowPostModal(false)} 
      />
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowEditModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Edit Profile</h3>
                  <motion.button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-2">
                    <img 
                      src={editAvatar || currentUser?.avatar || '/general/avatar.png'} 
                      alt="avatar" 
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100" 
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full border-2 border-white shadow text-white hover:bg-blue-700"
                      title="Change profile picture"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 text-sm mb-2"
                  >
                    Edit picture or avatar
                  </button>
                  <button
                    onClick={() => { setEditAvatar('/general/avatar.png'); }}
                    className="text-red-500 text-sm"
                  >Remove current picture</button>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    maxLength={150}
                    placeholder="Tell people a little about yourself..."
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {editBio.length}/150
                  </div>
                </div>
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className={`mt-4 w-full text-white rounded-lg py-2 font-semibold transition-colors ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfilePage;