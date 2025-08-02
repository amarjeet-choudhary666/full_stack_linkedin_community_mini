import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PostCard = ({ post, onPostDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/posts/${post.id}`);
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user?.id === post.author?.id;

  return (
    <div className="card-hover p-6">
      <div className="flex items-start space-x-3 mb-4">
        <div className="avatar avatar-md bg-blue-600">
          {post.author?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Link 
              to={`/profile/${post.author?.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.author?.name}
            </Link>
            <span className="text-gray-500">•</span>
            <Link 
              to={`/user/${post.author?.username}`}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              @{post.author?.username}
            </Link>
            <span className="text-gray-500">•</span>
            <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          </div>
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
              title="Delete post"
            >
              {loading ? (
                <div className="loading-spinner w-4 h-4"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
      
      {post.imageUrl && (
        <div className="mb-4">
          <img 
            src={post.imageUrl} 
            alt="Post image" 
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;