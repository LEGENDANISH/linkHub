import React from 'react';
import { X } from 'lucide-react';

const AnimateSection = ({ link, onClose, onUpdate }) => {
  const handleAnimationChange = (animation) => {
    onUpdate({ animation });
  };

  // Helper to get button classes for animation options
  const getAnimationButtonClasses = (anim, isSelected) => {
    switch(anim) {
      case 'buzz':
        return isSelected
          ? 'border-brand-concrete bg-gray-100 font-semibold'
          : 'border-gray-300 hover:border-brand-concrete hover:animate-buzz';
      case 'wobble':
        return isSelected
          ? 'border-brand-sand bg-gray-100 font-semibold'
          : 'border-gray-300 hover:border-brand-sand hover:animate-wobble';
      case 'pop':
        return isSelected
          ? 'border-brand-sand bg-gray-100 font-semibold'
          : 'border-gray-300 hover:border-brand-sand hover:animate-pop';
      case 'swipe':
        return isSelected
          ? 'border-brand-concrete bg-gray-100 font-semibold'
          : 'border-gray-300 hover:border-brand-concrete hover:bg-swipe hover:animate-swipe';
      default:
        return '';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Animate</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <h4 className="font-semibold text-lg mb-2">Animate BUZZ</h4>
      <p className="text-gray-600 mb-6">Draw attention to your most important link.</p>
      
      <div className="mb-6">
        <h5 className="font-semibold mb-4">Prioritize with:</h5>
        
        {/* Animation Option */}
        <div className={`mb-4 p-4 rounded-xl border-2 transition-all bg-white ${
          ['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) ? 'border-black' : 'border-gray-300'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
              ['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) ? 'border-black' : 'border-gray-400'
            }`}>
              {['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) && <div className="w-4 h-4 rounded-full bg-black" />}
            </div>
            <div className="flex-1">
              <h6 className="font-semibold mb-1">Animation</h6>
              <p className="text-gray-600 text-sm mb-4">Link displays with a fun and engaging motion effect.</p>
              
              <div className="grid grid-cols-4 gap-3">
                {['buzz', 'wobble', 'pop', 'swipe'].map((anim) => (
                  <button
                    key={anim}
                    onClick={() => handleAnimationChange(anim)}
                    className={`py-3 px-4 rounded-lg border transition-all ${
                      getAnimationButtonClasses(anim, link.animation === anim)
                    }`}
                  >
                    {anim.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight Option */}
        <button
          onClick={() => handleAnimationChange('spotlight')}
          className={`w-full mb-4 p-4 rounded-xl border-2 transition-all bg-white ${
            link.animation === 'spotlight' ? 'border-black' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
              link.animation === 'spotlight' ? 'border-black' : 'border-gray-400'
            }`}>
              {link.animation === 'spotlight' && <div className="w-4 h-4 rounded-full bg-black" />}
            </div>
            <div className="flex-1 text-left">
              <h6 className="font-semibold mb-1">Spotlight</h6>
              <p className="text-gray-600 text-sm">Automatically expand this link when a visitor arrives on your Linktree.</p>
            </div>
          </div>
        </button>

        {/* No Animation Option */}
        <button
          onClick={() => handleAnimationChange('none')}
          className={`w-full p-4 rounded-xl border-2 transition-all bg-white ${
            link.animation === 'none' ? 'border-black' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
              link.animation === 'none' ? 'border-black' : 'border-gray-400'
            }`}>
              {link.animation === 'none' && <div className="w-4 h-4 rounded-full bg-black" />}
            </div>
            <div className="flex-1 text-left">
              <h6 className="font-semibold">Don't animate this link</h6>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AnimateSection;