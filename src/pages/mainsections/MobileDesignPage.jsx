import React, { useState } from 'react';
import { X } from 'lucide-react';
import MobilePreview from '../RightSide/MobilePreview';

const MobileDesignPage = ({ onBack }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownOptions = {
    theme: {
      title: 'Theme',
      tabs: ['Customizable', 'Curated'],
      content: (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Custom</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-300 to-green-500"></div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700">Agile</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">Aa</span>
              </div>
              <span className="text-xs font-medium text-gray-700">Air</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl"></div>
              <span className="text-xs font-medium text-gray-700">Dark</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl"></div>
              <span className="text-xs font-medium text-gray-700">Light</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl relative overflow-hidden">
                <img src="/api/placeholder/100/100" alt="Pattern" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-gray-700">Urban</span>
            </div>
          </div>
        </div>
      )
    },
    header: {
      title: 'Header',
      content: (
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile Image</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium flex items-center gap-2">
                <span className="text-lg">+</span> Add
              </button>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xs text-red-700">Add a profile image to let your visitors know it's you!</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile Image layout</h3>
            <div className="flex gap-3">
              <button className="flex-1 py-3 border-2 border-gray-300 rounded-xl flex flex-col items-center gap-1 hover:border-purple-500 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs font-medium text-gray-700">Classic</span>
              </button>
              
              <button className="flex-1 py-3 border-2 border-gray-300 rounded-xl flex flex-col items-center gap-1 hover:border-purple-500 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <span className="text-xs font-medium text-gray-700">Hero</span>
              </button>
              
              <button className="w-10 h-10 border-2 border-gray-300 rounded-xl flex items-center justify-center self-center hover:border-purple-500 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )
    },
    wallpaper: {
      title: 'Wallpaper',
      content: (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl"></div>
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl"></div>
            <div className="aspect-square bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl"></div>
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl"></div>
            <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl"></div>
            <div className="aspect-square bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl"></div>
          </div>
        </div>
      )
    },
    style: {
      title: 'Style',
      content: (
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Button Style</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">Rounded</button>
              <button className="py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Square</button>
              <button className="py-2 bg-gray-100 text-gray-600 rounded text-sm font-medium">Soft</button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Shadow</h3>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium shadow-sm">Soft</button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium shadow-md">Medium</button>
              <button className="flex-1 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium shadow-lg">Hard</button>
            </div>
          </div>
        </div>
      )
    }
  };

  const handleOptionClick = (option) => {
    setActiveDropdown(activeDropdown === option ? null : option);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* MobilePreview Background - Always visible */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="scale-[0.85]">
          <MobilePreview />
        </div>
      </div>

      {/* Dropdown Overlay */}
      <div 
        className={`absolute inset-0 bg-white/95 backdrop-blur-xl z-20 transition-transform duration-300 ease-out ${
          activeDropdown ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {activeDropdown && (
          <div className="h-full flex flex-col">
            {/* Dropdown Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">
                {dropdownOptions[activeDropdown]?.title}
              </h2>
              <button 
                onClick={() => setActiveDropdown(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs if available */}
            {dropdownOptions[activeDropdown]?.tabs && (
              <div className="px-5 py-3 border-b border-gray-200 flex gap-2 flex-shrink-0">
                {dropdownOptions[activeDropdown].tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      index === 0 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Dropdown Content */}
            <div className="flex-1 overflow-y-auto">
              {dropdownOptions[activeDropdown]?.content}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation - Design Options */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 z-30">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 flex justify-around px-3 py-3">
          <button
            onClick={() => handleOptionClick('theme')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeDropdown === 'theme' ? 'bg-purple-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeDropdown === 'theme' ? 'bg-purple-600' : 'bg-gray-100'
            }`}>
              <svg 
                className={`w-5 h-5 ${activeDropdown === 'theme' ? 'text-white' : 'text-gray-600'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium ${
              activeDropdown === 'theme' ? 'text-purple-600' : 'text-gray-600'
            }`}>
              Theme
            </span>
          </button>

          <button
            onClick={() => handleOptionClick('header')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeDropdown === 'header' ? 'bg-purple-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeDropdown === 'header' ? 'bg-purple-600' : 'bg-gray-100'
            }`}>
              <svg 
                className={`w-5 h-5 ${activeDropdown === 'header' ? 'text-white' : 'text-gray-600'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium ${
              activeDropdown === 'header' ? 'text-purple-600' : 'text-gray-600'
            }`}>
              Header
            </span>
          </button>

          <button
            onClick={() => handleOptionClick('wallpaper')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeDropdown === 'wallpaper' ? 'bg-purple-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeDropdown === 'wallpaper' ? 'bg-purple-600' : 'bg-gray-100'
            }`}>
              <svg 
                className={`w-5 h-5 ${activeDropdown === 'wallpaper' ? 'text-white' : 'text-gray-600'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium ${
              activeDropdown === 'wallpaper' ? 'text-purple-600' : 'text-gray-600'
            }`}>
              Wallpaper
            </span>
          </button>

          <button
            onClick={() => handleOptionClick('style')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeDropdown === 'style' ? 'bg-purple-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeDropdown === 'style' ? 'bg-purple-600' : 'bg-gray-100'
            }`}>
              <svg 
                className={`w-5 h-5 ${activeDropdown === 'style' ? 'text-white' : 'text-gray-600'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium ${
              activeDropdown === 'style' ? 'text-purple-600' : 'text-gray-600'
            }`}>
              Style
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileDesignPage;