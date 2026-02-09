import React from 'react';
import { X } from 'lucide-react';

const ThumbnailSection = ({ link, onClose, onUpdate }) => {
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    onUpdate({ thumbnail: null });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add Thumbnail</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-center text-gray-700 mb-6">Add a Thumbnail or Icon to this Link.</p>
      
      <label className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors bg-white">
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/avif,image/svg+xml,image/bmp,image/heic,image/heif"
          onChange={handleThumbnailUpload}
          className="hidden"
        />
        <div className="w-16 h-16 mb-4 text-gray-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <p className="text-gray-700 font-medium mb-2">Select file to upload,</p>
        <p className="text-gray-700 font-medium mb-4">or drag-and-drop file</p>
        <p className="text-gray-500 text-sm">Accepted file types: JPEG, PNG, GIF, WebP, AVIF, SVG, BMP, HEIC, HEIF</p>
      </label>

      {link.thumbnail && (
        <div className="mt-4">
          <img src={link.thumbnail} alt="Thumbnail preview" className="w-full h-32 object-cover rounded-lg" />
          <button
            onClick={handleRemoveThumbnail}
            className="mt-2 text-red-600 hover:text-red-700 text-sm"
          >
            Remove thumbnail
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSection;