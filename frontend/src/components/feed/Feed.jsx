import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchAllPosts } from '../../slices/PostSlice.js'
import Post from './Post'
import Share from './Share'

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const handlePostCreated = () => {
    // Refresh posts after creating a new one
    dispatch(fetchAllPosts());
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <motion.div 
          className="flex justify-center items-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <motion.div 
          className="bg-red-50 border border-red-200 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-red-600">Error loading posts: {error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 overflow-x-hidden">
      <AnimatePresence>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <Post post={post} />
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center py-8 text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            No posts yet. Visit your profile to create your first post!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Feed
