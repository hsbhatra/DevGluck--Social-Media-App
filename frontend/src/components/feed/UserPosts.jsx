import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserPosts } from '../../slices/PostSlice.js';
import Post from './Post';

const UserPosts = ({ userId: propUserId }) => {
  const dispatch = useDispatch();
  const { userId: urlUserId } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { userPosts, loading, error } = useSelector((state) => state.posts);

  // Use prop userId, then URL userId, then current user's ID
  const targetUserId = propUserId || urlUserId || currentUser?._id;

  useEffect(() => {
    if (targetUserId) {
      dispatch(fetchUserPosts(targetUserId));
    }
  }, [dispatch, targetUserId]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading user posts: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 overflow-x-hidden">
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No posts found for this user.
        </div>
      )}
    </div>
  );
};

export default UserPosts; 