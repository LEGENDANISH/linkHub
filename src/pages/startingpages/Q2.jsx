import React, { useState } from "react";

const Q2 = () => {
  const MAX_SELECT = 5;

  const platforms = [
    { id: "instagram", name: "Instagram", icon: "📸", gradient: "from-purple-600 to-pink-500" },
    { id: "whatsapp", name: "WhatsApp", icon: "💬", gradient: "from-green-500 to-green-600" },
    { id: "tiktok", name: "TikTok", icon: "🎵", gradient: "from-black to-pink-500" },
    { id: "youtube", name: "YouTube", icon: "▶️", gradient: "from-red-600 to-red-700" },
    { id: "website", name: "Personal Website", icon: "🌐", gradient: "from-blue-500 to-cyan-500" },
    { id: "spotify", name: "Spotify", icon: "🎧", gradient: "from-green-400 to-green-600" },
    { id: "threads", name: "Threads", icon: "🧵", gradient: "from-gray-800 to-black" },
    { id: "facebook", name: "Facebook", icon: "📘", gradient: "from-blue-600 to-blue-700" },
    { id: "twitter", name: "X / Twitter", icon: "🐦", gradient: "from-gray-900 to-black" },
  ];

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      if (selected.length < MAX_SELECT) {
        setSelected([...selected, id]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-5">
        <button className="text-gray-700 font-medium hover:text-gray-900 transition">
          ← Back
        </button>
        <button className="text-gray-500 font-medium hover:text-gray-700 transition">
          Skip
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Which platforms are you on?
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-md mx-auto">
          Pick up to {MAX_SELECT} to get started. You can always update these later.
        </p>
        <p className="text-sm text-purple-600 font-medium mt-2">
          {selected.length}/{MAX_SELECT} selected
        </p>
      </div>

      {/* Grid */}
      <div className="mt-12 px-6 flex justify-center flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl w-full h-fit">
          
          {platforms.map((item) => {
            const isActive = selected.includes(item.id);
            const isDisabled = !isActive && selected.length >= MAX_SELECT;

            return (
              <div
                key={item.id}
                onClick={() => !isDisabled && toggleSelect(item.id)}
                className={`relative cursor-pointer border-2 rounded-2xl 
                            flex flex-col items-center justify-center
                            py-8 transition-all duration-200 group
                            ${
                              isActive
                                ? "border-purple-600 bg-white shadow-xl scale-105"
                                : isDisabled
                                ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-102"
                            }`}
              >
                {/* Checkmark for selected items */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
                
                <div className={`text-4xl mb-3 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center px-2">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center py-10 px-6">
        <button
          disabled={selected.length === 0}
          className={`px-16 py-4 rounded-full text-base font-semibold transition-all duration-200
            shadow-lg
            ${
              selected.length > 0
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-2xl hover:scale-105 active:scale-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Q2;