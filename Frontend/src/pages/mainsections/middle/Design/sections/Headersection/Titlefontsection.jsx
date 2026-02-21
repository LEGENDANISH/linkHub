import React, { useState } from "react";

const TitleFontSection = ({ state, updateDesign }) => {
  const [showTitleFontPicker, setShowTitleFontPicker] = useState(false);

  const fonts = [
    { name: "Albert Sans", isPro: false },
    { name: "Belanosima", isPro: true },
    { name: "Bricolage Grotesque", isPro: true, proLevel: 4 },
    { name: "DM Sans", isPro: false },
    { name: "Epilogue", isPro: false },
    { name: "IBM Plex Sans", isPro: false },
    { name: "Inter", isPro: false },
    { name: "Lato", isPro: true },
    { name: "Link Sans", isPro: false },
    { name: "M Plus Rounded", isPro: true },
    { name: "Manrope", isPro: false },
    { name: "Oxanium", isPro: false },
    { name: "Poppins", isPro: true, proLevel: 4 },
    { name: "Red Hat Display", isPro: false },
    { name: "Roboto", isPro: true, proLevel: 4 },
    { name: "Rubik", isPro: true },
    { name: "Space Grotesk", isPro: true, proLevel: 4 },
    { name: "Syne", isPro: true },
  ];

  const handleFontSelect = (fontName) => {
    updateDesign("titleFont", fontName);
    setShowTitleFontPicker(false);
  };

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Title font</label>

      <div className="relative">
        <button
          onClick={() => setShowTitleFontPicker(!showTitleFontPicker)}
          className="w-full h-12 border border-gray-300 rounded-xl px-3 sm:px-4 flex items-center justify-between bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
        >
          <span className="text-base sm:text-lg">
            {state.titleFont || "Inter"}
          </span>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Font Picker Modal */}
        {showTitleFontPicker && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowTitleFontPicker(false)}
            />
            
            {/* Modal - Fixed positioning for mobile, absolute for desktop */}
<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
w-[90vw] sm:w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 
max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
                <h3 className="text-lg font-semibold">Title font</h3>
                <button
                  onClick={() => setShowTitleFontPicker(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-4">
                  {fonts.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => handleFontSelect(font.name)}
                      className={`p-3 sm:p-4 rounded-xl text-left transition-all relative ${
                        state.titleFont === font.name
                          ? "bg-white border-2 border-black"
                          : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
                      }`}
                    >
                      <span className="text-sm sm:text-base font-medium">
                        {font.name}
                      </span>
                      {font.isPro && (
                        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                          {font.proLevel ? font.proLevel : "✓"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TitleFontSection;