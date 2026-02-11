import React, { useState } from 'react';
import { X, Image, Crop, Link as LinkIcon, Sparkles } from 'lucide-react';
import ThumbnailCropModal from './ThumbnailCropModal';

const LayoutSection = ({ link, onClose, onUpdate }) => {
  const [showCropModal, setShowCropModal] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const handleLayoutChange = (layout) => {
    onUpdate({ layout });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imageData = event.target.result;
      onUpdate({ 
        thumbnail: imageData,
        thumbnailCrop: null // Reset crop when new image uploaded
      });
      setUploadingThumbnail(false);
      setShowCropModal(true);
    };
    
    reader.readAsDataURL(file);
  };

  const handleCropSave = (cropData) => {
    onUpdate({ thumbnailCrop: cropData });
    setShowCropModal(false);
  };

  const handlePillPositionChange = (position) => {
    onUpdate({ pillPosition: position });
  };

  const handleIconTypeChange = (iconType) => {
    onUpdate({ iconType });
  };

  const getCroppedImageStyle = () => {
    if (!link.thumbnailCrop) return {};
    
    const { x, y, scale } = link.thumbnailCrop;
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      transformOrigin: '0 0',
      width: 'auto',
      height: 'auto'
    };
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold">Layout</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Choose a layout for your link</p>
      
      {/* Classic Layout */}
      <button
        onClick={() => handleLayoutChange('classic')}
        className={`w-full mb-4 p-3 sm:p-4 rounded-xl border-2 transition-all ${
          link.layout === 'classic' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            link.layout === 'classic' ? 'border-black' : 'border-gray-400'
          }`}>
            {link.layout === 'classic' && <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black" />}
          </div>
          <div className="text-left flex-1">
            <h3 className="font-semibold text-base sm:text-lg leading-none">Classic</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Efficient, direct and compact.
            </p>
          </div>
        </div>
      </button>

      {/* Pill-Shaped Layout */}
      <button
        onClick={() => handleLayoutChange('pill')}
        className={`w-full mb-4 p-3 sm:p-4 rounded-xl border-2 transition-all ${
          link.layout === 'pill' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            link.layout === 'pill' ? 'border-black' : 'border-gray-400'
          }`}>
            {link.layout === 'pill' && <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-left mb-3">
              <h3 className="font-semibold text-base sm:text-lg leading-none">Pill-Shaped</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Modern pill design with icon and content.
              </p>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-800 rounded-full h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4 mb-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  {link.thumbnail ? (
                    <img 
                      src={link.thumbnail} 
                      alt=""
                      className="absolute object-cover"
                      style={{
                        ...getCroppedImageStyle(),
                        minWidth: '100%',
                        minHeight: '100%'
                      }}
                    />
                  ) : (
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div className="text-white text-xs sm:text-sm font-medium truncate">
                  {link.name || 'Link name'}
                </div>
              </div>
              <div className="text-white text-lg sm:text-xl flex-shrink-0 ml-2">⋯</div>
            </div>

            {/* Pill Options */}
            {link.layout === 'pill' && (
              <div className="space-y-3 sm:space-y-4 pt-3 border-t">
                {/* Thumbnail Management */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Icon/Thumbnail
                  </label>
                  <div className="flex gap-2">
                    {!link.thumbnail ? (
                      <>
                        <label className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer">
                          <Image className="w-4 h-4" />
                          <span className="hidden sm:inline">Upload Image</span>
                          <span className="sm:hidden">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={() => handleIconTypeChange('auto')}
                          className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                            link.iconType === 'auto' 
                              ? 'border-black bg-gray-50' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span className="hidden sm:inline">Auto Icon</span>
                          <span className="sm:hidden">Auto</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowCropModal(true)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                          <Crop className="w-4 h-4" />
                          <span className="hidden sm:inline">Adjust Crop</span>
                          <span className="sm:hidden">Adjust</span>
                        </button>
                        <button
                          onClick={() => onUpdate({ thumbnail: null, thumbnailCrop: null })}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Position Controls */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Icon Position
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePillPositionChange('left')}
                      className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-sm font-medium transition ${
                        (link.pillPosition || 'left') === 'left'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Left
                    </button>
                    <button
                      onClick={() => handlePillPositionChange('right')}
                      className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-sm font-medium transition ${
                        link.pillPosition === 'right'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Right
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Featured Layout */}
      <button
        onClick={() => handleLayoutChange('featured')}
        className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all ${
          link.layout === 'featured' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4 w-full">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              link.layout === "featured" ? "border-black" : "border-gray-400"
            }`}
          >
            {link.layout === "featured" && (
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-black rounded-full" />
            )}
          </div>

          <div className="text-left flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg leading-none">Featured</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Make your link stand out with a larger, more attractive display.
            </p>

            {link.layout === 'featured' && (
              <div className="mt-3 sm:mt-4">
                {!link.thumbnail ? (
                  <label className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer inline-flex">
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add thumbnail
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCropModal(true);
                      }}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2"
                    >
                      <Crop className="w-4 h-4" />
                      <span className="hidden sm:inline">Adjust Image</span>
                      <span className="sm:hidden">Adjust</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate({ thumbnail: null, thumbnailCrop: null });
                      }}
                      className="px-3 sm:px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm font-medium hover:bg-red-50 transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Featured Preview Image - Shows for featured layout */}
          {link.layout === 'featured' && (
            <div className="flex-shrink-0 w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
              <div className="w-full sm:w-[230px] h-[150px] sm:h-[130px] rounded-xl overflow-hidden relative">
                {link.thumbnail ? (
                  <>
                    <img
                      src={link.thumbnail}
                      alt="preview"
                      className="absolute object-cover"
                      style={{
                        ...getCroppedImageStyle(),
                        minWidth: '100%',
                        minHeight: '100%'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-3 text-white text-xs font-medium">
                      {link.name || 'Link name'}
                    </div>
                    <div className="absolute bottom-2 right-3 text-white text-lg">⋯</div>
                  </>
                ) : (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                      alt="preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-3 text-white text-xs">
                      Now touring, get your tickets
                    </div>
                    <div className="absolute bottom-2 right-3 text-white text-lg">⋯</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Thumbnail Crop Modal */}
      {showCropModal && link.thumbnail && (
        <ThumbnailCropModal
          image={link.thumbnail}
          currentCrop={link.thumbnailCrop}
          onSave={handleCropSave}
          onClose={() => setShowCropModal(false)}
          aspectRatio={link.layout === 'featured' ? 16 / 9 : 1}
        />
      )}
    </div>
  );
};

export default LayoutSection;