import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const UserProfile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await api.get(`/posts/user/${username}`);
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response?.status === 404) {
          setError('User not found');
        } else {
          setError('Failed to load user profile');
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const handlePostDeleted = (postId) => {
    if (profileData) {
      setProfileData({
        ...profileData,
        posts: profileData.posts.filter(post => post.id !== postId)
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner w-8 h-8 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <p className="text-gray-500 mb-6">
            {error === 'User not found' 
              ? "The user you're looking for doesn't exist or may have changed their username."
              : "Please try again or contact support if the problem persists."
            }
          </p>
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const { user, posts } = profileData;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="card p-6 fade-in">
        <div className="flex items-start space-x-6">
          <div className="avatar avatar-xl bg-blue-600">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 text-lg mb-1">@{user.username}</p>
                {isOwnProfile && (
                  <div className="status-badge status-online mt-2">
                    This is you
                  </div>
                )}
              </div>
              
              {isOwnProfile && (
                <Link to="/profile" className="btn-secondary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </Link>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>About</span>
              </h3>
              {user.bio ? (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                  <p className="text-gray-500 italic">
                    {isOwnProfile ? "You haven't added a bio yet." : "No bio available"}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-6">
              <div className="text-center bg-blue-50 rounded-lg p-4 min-w-[100px]">
                <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                <div className="text-gray-600 font-medium">Posts</div>
              </div>
              <div className="text-center bg-green-50 rounded-lg p-4 min-w-[100px]">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-gray-600 font-medium">Followers</div>
              </div>
              <div className="text-center bg-purple-50 rounded-lg p-4 min-w-[100px]">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-gray-600 font-medium">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isOwnProfile ? 'Your Posts' : `${user.name}'s Posts`}
          </h2>
          <span className="text-sm text-gray-500">{posts.length} posts</span>
        </div>
        
        {posts.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-6">
              {isOwnProfile 
                ? "You haven't shared anything yet. Create your first post!" 
                : `${user.name} hasn't shared anything yet.`
              }
            </p>
            {isOwnProfile && (
              <Link to="/" className="btn-primary">
                Create Your First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} onPostDeleted={handlePostDeleted} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;