import React from 'react';
import { X, Image } from 'lucide-react';

const LayoutSection = ({ link, onClose, onUpdate }) => {
  const handleLayoutChange = (layout) => {
    onUpdate({ layout });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-2 bg-[#E0E2D9] w">
        <div className='items-center justify-center text-lg font-semibold '>
          Layout
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">Choose a layout for your link</p>
      
      {/* Classic Layout */}
      <button
        onClick={() => handleLayoutChange('classic')}
        className={`w-full mb-4 p-4 rounded-xl border-2 transition-all ${
          link.layout === 'classic' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            link.layout === 'classic' ? 'border-black' : 'border-gray-400'
          }`}>
            {link.layout === 'classic' && <div className="w-4 h-4 rounded-full bg-black" />}
          </div>
          <div className="flex items-center w-full">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              {/* text */}
              <div className="text-left">
                <h3 className="font-semibold text-lg leading-none">Classic</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Efficient, direct and compact.
                </p>
              </div>
            </div>

            {/* RIGHT MOST PILL */}
            <div className="ml-auto bg-teal-800 rounded-full h-12 w-[220px] flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500" />
                <div className="text-white text-sm opacity-80">...</div>
              </div>
              <div className="text-white text-lg">⋯</div>
            </div>
          </div>
        </div>
      </button>

      {/* Featured Layout */}
      <button
        onClick={() => handleLayoutChange('featured')}
        className={`w-full p-4 rounded-xl border-2 transition-all ${
          link.layout === 'featured' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-start gap-4 w-full">
          {/* radio */}
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-1 ${
              link.layout === "featured" ? "border-black" : "border-gray-400"
            }`}
          >
            {link.layout === "featured" && (
              <div className="w-3.5 h-3.5 bg-black rounded-full" />
            )}
          </div>

          {/* feature content (takes full space) */}
          <div className="text-left flex-1">
            <h3 className="font-semibold text-lg leading-none">Featured</h3>

            <p className="text-gray-600 text-sm mt-1 max-w-md">
              Make your link stand out with a larger, more attractive display.
            </p>

            {!link.thumbnail && (
              <button className="mt-4 px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition flex items-center gap-2">
                <Image className="w-5 h-5" />
                Add thumbnail
              </button>
            )}
          </div>

          {/* image pushed to extreme right */}
          <div className="flex-shrink-0 ml-auto">
            <div className="w-[230px] h-[130px] rounded-xl overflow-hidden relative">
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
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LayoutSection;