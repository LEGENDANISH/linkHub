// Q3.jsx
import React, { useState } from 'react';

const Q3 = ({ selectedPlatforms = [], onContinue, onBack, onSkip }) => {
  const [links, setLinks] = useState({});
  const [errors, setErrors] = useState({});

  // Platform configuration with placeholders and validation
  const platformConfig = {
    instagram: {
      icon: "📸",
      gradient: "from-purple-600 to-pink-500",
      placeholder: "instagram.com/yourhandle",
      label: "Instagram Profile"
    },
    whatsapp: {
      icon: "💬",
      gradient: "from-green-500 to-green-600",
      placeholder: "+1234567890 or whatsapp link",
      label: "WhatsApp Number"
    },
    tiktok: {
      icon: "🎵",
      gradient: "from-black to-pink-500",
      placeholder: "tiktok.com/@yourhandle",
      label: "TikTok Profile"
    },
    youtube: {
      icon: "▶️",
      gradient: "from-red-600 to-red-700",
      placeholder: "youtube.com/@yourchannel",
      label: "YouTube Channel"
    },
    website: {
      icon: "🌐",
      gradient: "from-blue-500 to-cyan-500",
      placeholder: "https://yourwebsite.com",
      label: "Personal Website"
    },
    spotify: {
      icon: "🎧",
      gradient: "from-green-400 to-green-600",
      placeholder: "open.spotify.com/artist/...",
      label: "Spotify Profile"
    },
    threads: {
      icon: "🧵",
      gradient: "from-gray-800 to-black",
      placeholder: "threads.net/@yourhandle",
      label: "Threads Profile"
    },
    facebook: {
      icon: "📘",
      gradient: "from-blue-600 to-blue-700",
      placeholder: "facebook.com/yourpage",
      label: "Facebook Page"
    },
    twitter: {
      icon: "🐦",
      gradient: "from-gray-900 to-black",
      placeholder: "x.com/yourhandle",
      label: "X / Twitter Profile"
    }
  };

  const handleInputChange = (platformId, value) => {
    setLinks(prev => ({
      ...prev,
      [platformId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[platformId]) {
      setErrors(prev => ({
        ...prev,
        [platformId]: false
      }));
    }
  };

  const validateLinks = () => {
    const newErrors = {};
    let isValid = true;

    selectedPlatforms.forEach(platformId => {
      if (!links[platformId] || links[platformId].trim() === '') {
        newErrors[platformId] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateLinks()) {
      onContinue(links);
    }
  };

  const filledCount = Object.values(links).filter(link => link && link.trim() !== '').length;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-4">
        <button 
          onClick={onBack}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black transition"
        >
          ← Back
        </button>
        <button 
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black transition"
        >
          Skip
        </button>
      </div>

      {/* Progress bar */}
  <div className="w-full flex justify-center mb-2">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-3   /3 h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"></div>
        </div>
      </div>
      {/* Title */}
      <div className="text-center mt-8 sm:mt-12 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
          Add your links
        </h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base font-medium max-w-md mx-auto">
          Complete the fields below to add your content to your new LinkHub.
        </p>
      </div>

      {/* Selected platforms counter */}
      <div className="text-center mt-6 px-4">
        <p className="text-sm sm:text-base font-semibold text-gray-600">
          Your selection: {filledCount}/{selectedPlatforms.length} completed
        </p>
      </div>

      {/* Links input section */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 overflow-y-auto">
        <div className="space-y-4 sm:space-y-5">
          {selectedPlatforms.map((platformId) => {
            const config = platformConfig[platformId];
            const hasError = errors[platformId];
            const isFilled = links[platformId] && links[platformId].trim() !== '';

            return (
              <div 
                key={platformId}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                {/* Platform header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xl sm:text-2xl shadow-md`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900">
                      {config.label}
                    </h3>
                  </div>
                  {isFilled && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </div>

                {/* Input field */}
                <div className="relative">
                  <input
                    type="text"
                    value={links[platformId] || ''}
                    onChange={(e) => handleInputChange(platformId, e.target.value)}
                    placeholder={config.placeholder}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 text-sm sm:text-base transition-all duration-200 focus:outline-none ${
                      hasError
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : isFilled
                        ? 'border-green-400 bg-green-50 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white'
                    }`}
                  />
                  {hasError && (
                    <p className="text-red-500 text-xs sm:text-sm mt-2 ml-1">
                      Please enter your {config.label.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button - Fixed at bottom */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
        <button
          onClick={handleContinue}
          disabled={filledCount === 0}
          className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 ${
            filledCount > 0
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-xl hover:scale-[1.02] active:scale-100'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Q3;