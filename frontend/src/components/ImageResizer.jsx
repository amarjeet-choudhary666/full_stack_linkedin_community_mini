import { useState, useEffect } from 'react';
import { resizeImage, getImageDimensions, formatFileSize } from '../utils/imageUtils';

const ImageResizer = ({ file, onImageProcessed, onCancel }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [quality, setQuality] = useState(0.8);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      
      getImageDimensions(file).then(dims => {
        setOriginalDimensions(dims);
        setDimensions({ width: dims.width, height: dims.height });
      });

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    if (file && dimensions.width && dimensions.height) {
      handleResize();
    }
  }, [dimensions, quality]);

  const handleResize = async () => {
    if (!file) return;
    
    setProcessing(true);
    try {
      const resizedBlob = await resizeImage(file, dimensions.width, dimensions.height, quality);
      const resizedUrl = URL.createObjectURL(resizedBlob);
      setResizedImage(resizedUrl);
    } catch (error) {
      console.error('Error resizing image:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDimensionChange = (type, value) => {
    const newValue = parseInt(value) || 0;
    if (type === 'width') {
      const newHeight = Math.round(newValue / (originalDimensions?.aspectRatio || 1));
      setDimensions({ width: newValue, height: newHeight });
    } else {
      const newWidth = Math.round(newValue * (originalDimensions?.aspectRatio || 1));
      setDimensions({ width: newWidth, height: newValue });
    }
  };

  const handleUseResized = async () => {
    if (!resizedImage) return;
    
    try {
      const response = await fetch(resizedImage);
      const blob = await response.blob();
      const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
      onImageProcessed(resizedFile);
    } catch (error) {
      console.error('Error creating resized file:', error);
    }
  };

  const presetSizes = [
    { name: 'Small', width: 400, height: 300 },
    { name: 'Medium', width: 800, height: 600 },
    { name: 'Large', width: 1200, height: 900 },
    { name: 'HD', width: 1920, height: 1080 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Resize Image</h2>
            <button
              onClick={onCancel}
              className="btn-ghost p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Image */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Original Image</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {originalImage && (
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                )}
                {originalDimensions && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p>Dimensions: {originalDimensions.width} × {originalDimensions.height}px</p>
                    <p>Size: {formatFileSize(file.size)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resized Image */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Resized Image</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {processing ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="loading-spinner w-8 h-8"></div>
                  </div>
                ) : resizedImage ? (
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 text-gray-400">
                    Processing...
                  </div>
                )}
                <div className="mt-3 text-sm text-gray-600">
                  <p>Dimensions: {dimensions.width} × {dimensions.height}px</p>
                  <p>Quality: {Math.round(quality * 100)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 space-y-6">
            {/* Preset Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preset Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {presetSizes.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setDimensions({ width: preset.width, height: preset.height })}
                    className="btn-ghost text-sm"
                  >
                    {preset.name} ({preset.width}×{preset.height})
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  className="input-field"
                  min="1"
                  max="4000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                  className="input-field"
                  min="1"
                  max="4000"
                />
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => onImageProcessed(file)}
              className="btn-ghost"
            >
              Use Original
            </button>
            <button
              onClick={handleUseResized}
              disabled={!resizedImage || processing}
              className="btn-primary"
            >
              Use Resized Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;