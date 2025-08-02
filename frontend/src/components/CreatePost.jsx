import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ImageResizer from './ImageResizer';
import { validateImageFile } from '../utils/imageUtils';
import api from '../services/api';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [showImageResizer, setShowImageResizer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      
      setRawImage(file);
      setShowImageResizer(true);
      setError('');
    }
  };

  const handleImageProcessed = (processedImage) => {
    setImage(processedImage);
    setShowImageResizer(false);
    setRawImage(null);
  };

  const handleCancelResize = () => {
    setShowImageResizer(false);
    setRawImage(null);
    // Reset file input
    const fileInput = document.getElementById('image');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some content');
      return;
    }

    if (!image) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image);

      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setImage(null);
      // Reset file input
      const fileInput = document.getElementById('image');
      if (fileInput) fileInput.value = '';
      
      if (onPostCreated) {
        onPostCreated(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="avatar avatar-md bg-blue-600">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
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
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="input-field resize-none h-24"
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {content.length}/500
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label htmlFor="image" className="btn-ghost cursor-pointer">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Photo
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  {image && (
                    <div className="status-badge status-online">
                      Image ready
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !content.trim() || !image}
                  className="btn-primary"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
              
              {image && (
                <div className="relative mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      const fileInput = document.getElementById('image');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Image Resizer Modal */}
      {showImageResizer && rawImage && (
        <ImageResizer
          file={rawImage}
          onImageProcessed={handleImageProcessed}
          onCancel={handleCancelResize}
        />
      )}
    </>
  );
};

export default CreatePost;