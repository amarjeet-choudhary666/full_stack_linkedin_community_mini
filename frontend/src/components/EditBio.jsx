import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const EditBio = ({ currentBio, onBioUpdated, onCancel }) => {
  const [bio, setBio] = useState(currentBio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bio.trim()) {
      setError('Bio cannot be empty');
      return;
    }

    if (bio.length > 500) {
      setError('Bio must be less than 500 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.put('/users/bio', { bio: bio.trim() });
      
      // Update the user context with new bio
      const updatedUser = { ...user, bio: response.data.data.bio };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      if (onBioUpdated) {
        onBioUpdated(response.data.data.bio);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update bio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full p-6 fade-in">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Edit Bio
          </h2>
          <p className="text-sm text-gray-600">
            Tell others about yourself
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 slide-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <div className="relative">
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
                className="input-field resize-none h-24"
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {bio.length}/500
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !bio.trim()}
              className="btn-primary flex-1"
            >
              {loading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update Bio'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBio;