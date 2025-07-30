import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const mockSavedPosts = [
  {
    id: 1,
    image: '/general/post.jpg',
    user: {
      name: 'Robert Fox',
      username: 'robert',
      avatar: '/general/avatar.png'
    },
    caption: 'Beautiful sunset at the mountains! 🌄 #nature #photography',
    likes: 124,
    comments: 8,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'alice', text: 'Amazing view!' },
      { id: 2, user: 'bob', text: 'Love this!' }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    user: {
      name: 'Sarah Wilson',
      username: 'sarah_w',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    caption: 'Delicious homemade pasta for dinner tonight! 🍝 #food #cooking',
    likes: 89,
    comments: 12,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'charlie', text: 'Looks delicious!' },
      { id: 2, user: 'diana', text: 'Can I have the recipe?' }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    user: {
      name: 'Mike Johnson',
      username: 'mike_j',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    caption: 'Starry night photography 📸 #astrophotography #night',
    likes: 256,
    comments: 23,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'emma', text: 'Beautiful!' },
      { id: 2, user: 'frank', text: 'Amazing!' }
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    user: {
      name: 'Emma Davis',
      username: 'emma_d',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    caption: 'Peaceful morning by the river 🌊 #nature #peace',
    likes: 167,
    comments: 15,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'george', text: 'So peaceful!' },
      { id: 2, user: 'hannah', text: 'Lovely!' }
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    user: {
      name: 'Alex Chen',
      username: 'alex_c',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    caption: 'Beach vibes 🏖️ #summer #beach',
    likes: 203,
    comments: 18,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'isabelle', text: 'Lovely!' },
      { id: 2, user: 'jack', text: 'Perfect!' }
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
    user: {
      name: 'Lisa Brown',
      username: 'lisa_b',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    caption: 'Coffee and good vibes ☕ #coffee #morning',
    likes: 145,
    comments: 9,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'michael', text: 'Great shot!' },
      { id: 2, user: 'natalie', text: 'Perfect!' }
    ]
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    user: {
      name: 'David Kim',
      username: 'david_k',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    caption: 'City lights at night 🌃 #urban #photography',
    likes: 189,
    comments: 14,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'olivia', text: 'Stunning!' },
      { id: 2, user: 'peter', text: 'Amazing cityscape!' }
    ]
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    user: {
      name: 'Sophie Martin',
      username: 'sophie_m',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    caption: 'Forest walk in autumn 🍂 #nature #autumn',
    likes: 234,
    comments: 21,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'rachel', text: 'So beautiful!' },
      { id: 2, user: 'sam', text: 'Love the colors!' }
    ]
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    user: {
      name: 'Tom Wilson',
      username: 'tom_w',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    caption: 'Sunset over the ocean 🌅 #sunset #ocean',
    likes: 312,
    comments: 28,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'tina', text: 'Breathtaking!' },
      { id: 2, user: 'victor', text: 'Perfect timing!' }
    ]
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    user: {
      name: 'Maria Garcia',
      username: 'maria_g',
      avatar: 'https://randomuser.me/api/portraits/women/88.jpg'
    },
    caption: 'Morning workout 💪 #fitness #motivation',
    likes: 156,
    comments: 11,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'william', text: 'Keep it up!' },
      { id: 2, user: 'zoe', text: 'Inspiring!' }
    ]
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    user: {
      name: 'James Lee',
      username: 'james_l',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg'
    },
    caption: 'Street photography 📷 #street #art',
    likes: 178,
    comments: 16,
    isLiked: false,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'anna', text: 'Great composition!' },
      { id: 2, user: 'ben', text: 'Love the mood!' }
    ]
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    user: {
      name: 'Nina Patel',
      username: 'nina_p',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
    },
    caption: 'Yoga session 🧘‍♀️ #yoga #wellness',
    likes: 198,
    comments: 13,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 1, user: 'carlos', text: 'Peaceful!' },
      { id: 2, user: 'diana', text: 'Beautiful practice!' }
    ]
  }
];

const SavedPostsPage = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(mockSavedPosts);
  const [commentInput, setCommentInput] = useState('');
  const [toast, setToast] = useState('');
  const [commentMode, setCommentMode] = useState(false);

  // Show toast for 2s
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

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

  const handleAddComment = () => {
    if (!commentInput.trim() || !selectedPost) return;
    const newComment = {
      id: Date.now(),
      user: 'you',
      text: commentInput.trim(),
    };
    setPosts(posts.map(post =>
      post.id === selectedPost.id
        ? { ...post, commentsList: [...(post.commentsList || []), newComment], comments: (post.comments || 0) + 1 }
        : post
    ));
    setSelectedPost(prev => prev ? {
      ...prev,
      commentsList: [...(prev.commentsList || []), newComment],
      comments: (prev.comments || 0) + 1
    } : prev);
    setCommentInput('');
    setCommentMode(false);
  };

  const handleShare = () => {
    // Mock: copy link to clipboard
    const url = window.location.origin + '/post/' + (selectedPost?.id || '');
    navigator.clipboard.writeText(url);
    setToast('Link copied!');
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  const toggleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        isSaved: !prev.isSaved
      }));
    }
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
      {/* Grid */}
      <div className="w-full max-w-md grid grid-cols-3 gap-1 bg-white rounded-xl overflow-hidden">
        {posts.map((post, idx) => (
          <button
            key={post.id}
            className="aspect-square w-full h-full overflow-hidden focus:outline-none"
            onClick={() => openModal(post)}
          >
            <img
              src={post.image}
              alt={`Saved post ${post.id}`}
              className="object-cover w-full h-full hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
      {/* Post Modal */}
      {selectedPost && (
        <>
          <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-50" onClick={closeModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPost.user.avatar}
                    alt={selectedPost.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{selectedPost.user.name}</h3>
                    <p className="text-xs text-gray-500">@{selectedPost.user.username}</p>
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
                  src={selectedPost.image}
                  alt="Post"
                  className="w-full h-auto"
                />
              </div>
              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(selectedPost.id)}
                      className={`p-2 rounded-full transition-colors ${
                        selectedPost.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
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
                    onClick={() => toggleSave(selectedPost.id)}
                    className={`p-2 rounded-full transition-colors ${
                      selectedPost.isSaved ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                    }`}
                  >
                    <Bookmark className={`w-6 h-6 ${selectedPost.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {/* Likes Count */}
                <div className="text-sm font-semibold mb-2">
                  {selectedPost.likes} likes
                </div>
                {/* Caption */}
                <div className="text-sm mb-2">
                  <span className="font-semibold mr-2">{selectedPost.user.username}</span>
                  {selectedPost.caption}
                </div>
                {/* Comments Section - Hidden by default, shown when comment icon is clicked */}
                {commentMode && (
                  <>
                    {/* Comments List */}
                    <div className="mb-2 max-h-32 overflow-y-auto">
                      {(selectedPost.commentsList || []).map(c => (
                        <div key={c.id} className="text-sm flex items-center mb-1">
                          <span className="font-semibold mr-2">{c.user}</span>
                          <span>{c.text}</span>
                        </div>
                      ))}
                    </div>
                    {/* Add Comment - Enhanced with comment mode */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <form className="flex items-center gap-2" onSubmit={e => { e.preventDefault(); handleAddComment(); }}>
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
                    {/* Comments Count */}
                    <div className="text-xs text-gray-500 mt-2">
                      View all {selectedPost.comments} comments
                    </div>
                  </>
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