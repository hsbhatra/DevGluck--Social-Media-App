import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Send, X } from 'lucide-react';
import { createPost } from '../../slices/PostSlice.js';

const PostInput = ({ 
  onPostCreated, 
  mode = 'inline', // 'inline' or 'modal'
  placeholder = "What's happening?",
  showUserInfo = true,
  className = ""
}) => {
  const dispatch = useDispatch();
  const { createLoading, createError } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.users);
  
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && !media) {
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('content', content.trim());
    
    if (media) {
      formData.append('media', media);
    }

    // Debug logging
    console.log("PostInput - FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      setContent('');
      setMedia(null);
      setMediaPreview(null);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const containerClasses = mode === 'modal' 
    ? "bg-white rounded-lg shadow-sm p-4"
    : "bg-white rounded-lg shadow-sm p-4 mb-4";

  return (
    <motion.div 
      className={`${containerClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <form onSubmit={handleSubmit}>
        {/* User Info - Only show in inline mode or when explicitly requested */}
        {showUserInfo && (
          <motion.div 
            className="flex items-start gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.img
              src={currentUser?.avatar || '/general/avatar.png'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">
                  {currentUser?.name}
                </span>
                <span className="text-gray-500 text-sm">@{currentUser?.username}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Text Input */}
        <motion.textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={mode === 'modal' ? "4" : "3"}
          maxLength="1000"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileFocus={{ scale: 1.01 }}
        />

        {/* Media Preview */}
        <AnimatePresence>
          {mediaPreview && (
            <motion.div 
              className="relative mt-3"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={mediaPreview}
                alt="preview"
                className="w-full max-h-64 object-cover rounded-lg"
              />
              <motion.button
                type="button"
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Count and Actions */}
        <motion.div 
          className="flex justify-between items-center mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image className="w-5 h-5" />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <motion.span 
              className={`text-sm ${content.length > 900 ? 'text-red-500' : 'text-gray-500'}`}
              animate={{ 
                color: content.length > 900 ? '#ef4444' : '#6b7280',
                scale: content.length > 900 ? 1.05 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {content.length}/1000
            </motion.span>
            <motion.button
              type="submit"
              disabled={createLoading || (!content.trim() && !media)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                createLoading || (!content.trim() && !media)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              whileHover={!createLoading && (content.trim() || media) ? { scale: 1.05 } : {}}
              whileTap={!createLoading && (content.trim() || media) ? { scale: 0.95 } : {}}
              transition={{ duration: 0.2 }}
            >
              {createLoading ? (
                <motion.div 
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Post
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {createError && (
            <motion.div 
              className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-red-600 text-sm">{createError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default PostInput;
