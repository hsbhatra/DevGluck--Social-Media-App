import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, X, Heart, MessageCircle, Share2, Bookmark, Home, Loader2 } from 'lucide-react';
import { getSavedPosts, savePost } from '../api/savedPostsApi.js';

const SavedPostsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [toast, setToast] = useState('');
  const [commentMode, setCommentMode] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch saved posts on component mount
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const posts = await getSavedPosts();
        setSavedPosts(posts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch saved posts:", err);
        setError(err.message || "Failed to load saved posts");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchSavedPosts();
    }
  }, [currentUser]);

  // Show toast for 2s
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Handle unsaving a post
  const handleUnsavePost = async (postId) => {
    try {
      const result = await savePost(postId);
      if (!result.saved) {
        // Remove the post from the saved posts list
        setSavedPosts(prev => prev.filter(post => post._id !== postId));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(null);
        }
        setToast('Post removed from saved');
      }
    } catch (err) {
      console.error("Error unsaving post:", err);
      setToast(err.message || 'Failed to unsave post');
    }
  };

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-500 text-sm">Loading your saved posts...</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <X className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-xs">
        {error}
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 text-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Bookmark className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No Saved Posts Yet</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-xs">
        When you save posts, they'll appear here. Start exploring and save posts you want to see again!
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go to Feed
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 text-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );

  const openModal = (post) => {
    setSelectedPost(post);
    setCommentMode(false);
    setCommentInput('');
  };
  
  const closeModal = () => {
    setSelectedPost(null);
    setCommentMode(false);
    setCommentInput('');
  };

  const handleCommentClick = () => {
    setCommentMode(true);
    setTimeout(() => {
      const input = document.getElementById('comment-input');
      if (input) input.focus();
    }, 100);
  };

  const handleShare = () => {
    // Mock: copy link to clipboard
    const url = window.location.origin + '/post/' + (selectedPost?._id || '');
    navigator.clipboard.writeText(url);
    setToast('Link copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-4 px-2">
      {/* Header */}
      <div className="flex items-center w-full max-w-md mb-2">
        <button onClick={() => navigate(-1)} className="mr-2 p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center">Saved</h1>
      </div>
      <div className="w-full max-w-md text-center text-gray-500 text-sm mb-4">
        Only you can see what you've saved
      </div>

      {/* Content */}
      <div className="w-full max-w-md bg-white rounded-xl overflow-hidden min-h-[400px]">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : savedPosts.length === 0 ? (
          <EmptyState />
        ) : (
          /* Grid for when there are saved posts */
          <div className="grid grid-cols-3 gap-1">
            {savedPosts.map((post, idx) => (
              <button
                key={post._id}
                className="aspect-square w-full h-full overflow-hidden focus:outline-none"
                onClick={() => openModal(post)}
              >
                <img
                  src={post.media || '/general/post.jpg'}
                  alt={`Saved post ${post._id}`}
                  className="object-cover w-full h-full hover:opacity-80 transition"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/general/post.jpg'; }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post Modal - Only shown when there are saved posts */}
      {selectedPost && (
        <>
          <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-50" onClick={closeModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPost.author.avatar || '/general/avatar.png'}
                    alt={selectedPost.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/general/avatar.png'; }}
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{selectedPost.author.name}</h3>
                    <p className="text-xs text-gray-500">@{selectedPost.author.username}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Post Image */}
              <div className="relative">
                <img
                  src={selectedPost.media || '/general/post.jpg'}
                  alt="Post"
                  className="w-full h-auto"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/general/post.jpg'; }}
                />
              </div>
              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button 
                      className={`p-2 rounded-full transition-colors ${
                        commentMode ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'
                      }`}
                      onClick={handleCommentClick}
                    >
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="p-2 rounded-full text-gray-600 hover:text-green-500 transition-colors" onClick={handleShare}>
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleUnsavePost(selectedPost._id)}
                    className="p-2 rounded-full text-blue-500 hover:text-red-500 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-6 h-6 fill-current" />
                  </button>
                </div>
                {/* Likes Count */}
                <div className="text-sm font-semibold mb-2">
                  {selectedPost.likes || 0} likes
                </div>
                {/* Caption */}
                {selectedPost.content && (
                  <div className="text-sm mb-2">
                    <span className="font-semibold mr-2">{selectedPost.author.username}</span>
                    {selectedPost.content}
                  </div>
                )}
                {/* Comments Section */}
                {commentMode && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <form className="flex items-center gap-2" onSubmit={e => { e.preventDefault(); }}>
                      <input
                        id="comment-input"
                        type="text"
                        className="flex-1 border border-blue-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        placeholder="Write your comment..."
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                      />
                      <button 
                        type="submit" 
                        className={`font-semibold text-sm px-3 py-2 rounded-full transition-all ${
                          commentInput.trim() 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!commentInput.trim()}
                      >
                        Post
                      </button>
                    </form>
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => setCommentMode(false)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full shadow-lg z-[100] text-sm">
          {toast}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage; 