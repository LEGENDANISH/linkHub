import React from 'react';
import { useSelectionManager } from './SelectionManager';

/**
 * MobilePreview - Example preview component
 * Shows how easy it is to render links using SelectionManager
 * All data comes from ONE centralized source!
 */
const MobilePreview = () => {
  const { getActiveLinks } = useSelectionManager();
  const activeLinks = getActiveLinks();

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-3xl p-4 shadow-2xl">
      {/* Phone Frame */}
      <div className="bg-white rounded-2xl overflow-hidden h-[600px]">
        {/* Status Bar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-700 px-6 py-8 text-white">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20" />
          </div>
          <h2 className="text-center font-semibold text-lg">@anish</h2>
        </div>

        {/* Links Container */}
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-120px)]">
          {activeLinks.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>No active links</p>
              <p className="text-sm mt-2">Add and activate links to see them here</p>
            </div>
          ) : (
            activeLinks.map((link) => (
              <LinkPreviewCard key={link.id} link={link} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * LinkPreviewCard - Individual link preview
 * Renders differently based on layout selection
 */
const LinkPreviewCard = ({ link }) => {
  // Classic Layout
  if (link.layout === 'classic') {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-400 transition-all cursor-pointer shadow-sm hover:shadow-md">
        <div className="flex items-center gap-3">
          {link.thumbnail && (
            <img 
              src={link.thumbnail} 
              alt={link.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{link.name}</p>
            {link.url && (
              <p className="text-xs text-gray-500 truncate">{link.url}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Featured Layout
  if (link.layout === 'featured') {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all cursor-pointer shadow-sm hover:shadow-md">
        {link.thumbnail ? (
          <div className="relative h-40">
            <img 
              src={link.thumbnail} 
              alt={link.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="font-semibold text-lg">{link.name}</p>
            </div>
          </div>
        ) : (
          <div className="relative h-40 bg-gradient-to-br from-purple-400 to-pink-500">
            <div className="absolute bottom-3 left-3 text-white">
              <p className="font-semibold text-lg">{link.name}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default MobilePreview;