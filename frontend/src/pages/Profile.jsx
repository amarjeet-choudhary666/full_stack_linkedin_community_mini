import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import EditBio from '../components/EditBio';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditBio, setShowEditBio] = useState(false);

  const isOwnProfile = currentUser?.id === userId;

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleBioUpdated = (newBio) => {
    setUser({ ...user, bio: newBio });
    setShowEditBio(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching profile data for userId:', userId);
        console.log('Current user:', currentUser);
        console.log('Is own profile:', isOwnProfile);

        // For now, we'll use the current user data if it's their own profile
        // In a real app, you'd have a separate endpoint to fetch user profiles
        if (isOwnProfile && currentUser) {
          setUser(currentUser);
          console.log('Using current user data:', currentUser);
        } else if (!isOwnProfile) {
          // You would fetch other user's profile here
          // const response = await api.get(`/users/${userId}`);
          // setUser(response.data.data);
          setError('Profile not found');
          return;
        } else {
          setError('User data not available');
          return;
        }

        // Fetch user's posts
        console.log('Fetching posts for userId:', userId);
        const postsResponse = await api.get(`/posts?userId=${userId}`);
        console.log('Posts response:', postsResponse.data);
        setPosts(postsResponse.data.data || []);
      } catch (error) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && currentUser) {
      fetchUserData();
    } else if (!userId) {
      setError('No user ID provided');
      setLoading(false);
    } else if (!currentUser) {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId, currentUser, isOwnProfile]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-200 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-red-500 text-xl font-semibold mb-2">{error || 'Profile not found'}</div>
          <div className="text-gray-500">Please try again or contact support if the problem persists.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="card p-8 fade-in">
          <div className="flex items-start space-x-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl floating-animation">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-2">{user.name}</h1>
                  <p className="text-gray-600 text-xl mb-1">@{user.username}</p>
                  <p className="text-gray-500 flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span>{user.email}</span>
                  </p>
                </div>
                
                {isOwnProfile && (
                  <button
                    onClick={() => setShowEditBio(true)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit Bio</span>
                  </button>
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
                  <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-300">
                    <p className="text-gray-500 italic">
                      {isOwnProfile ? "You haven't added a bio yet. Click 'Edit Bio' to add one!" : "No bio available"}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-8">
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 min-w-[100px]">
                  <div className="text-3xl font-bold gradient-text">{posts.length}</div>
                  <div className="text-gray-600 font-medium">Posts</div>
                </div>
                <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 min-w-[100px]">
                  <div className="text-3xl font-bold gradient-text">0</div>
                  <div className="text-gray-600 font-medium">Followers</div>
                </div>
                <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 min-w-[100px]">
                  <div className="text-3xl font-bold gradient-text">0</div>
                  <div className="text-gray-600 font-medium">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold gradient-text">
              {isOwnProfile ? 'Your Posts' : `${user.name}'s Posts`}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-purple-200"></div>
            <span className="text-gray-500 text-sm">{posts.length} posts</span>
          </div>
          
          {posts.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="text-gray-500 text-xl font-semibold mb-2">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </div>
              {isOwnProfile && (
                <div className="text-gray-400 mb-6">
                  Share your first post with the community!
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div key={post.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PostCard post={post} onPostDeleted={handlePostDeleted} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Bio Modal */}
      {showEditBio && (
        <EditBio
          currentBio={user.bio}
          onBioUpdated={handleBioUpdated}
          onCancel={() => setShowEditBio(false)}
        />
      )}
    </>
  );
};

export default Profile;