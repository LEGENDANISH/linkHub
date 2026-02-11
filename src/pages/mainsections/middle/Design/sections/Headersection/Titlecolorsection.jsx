import React, { useState } from "react";

const TitleColorSection = ({ state, updateDesign }) => {
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);

  const suggestedColors = ["#000000", "#1a1a1a", "#4a5568", "#2d3748", "#1a202c", "#718096"];

  const handleColorChange = (color) => {
    updateDesign("titleColor", color);
  };

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">
        Title font color
      </label>

      <div className="relative">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 border border-gray-300 rounded-xl px-3 py-3 sm:py-3.5 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
            type="text"
            placeholder="#000000"
            value={state.titleColor || "#000000"}
            onChange={(e) => handleColorChange(e.target.value)}
          />

          <button
            onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
            style={{ backgroundColor: state.titleColor || "#000000" }}
          />
        </div>

        {/* Color Picker Modal */}
        {showTitleColorPicker && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowTitleColorPicker(false)}
            />
            
            {/* Modal - Centered on mobile, positioned near button on desktop */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:absolute sm:left-0 sm:top-full sm:translate-x-0 sm:translate-y-0 sm:mt-2 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold">
                  Title font color
                </label>
                <button
                  onClick={() => setShowTitleColorPicker(false)}
                  className="sm:hidden w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
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

              {/* Color Gradient Picker */}
              <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                <input
                  type="color"
                  value={state.titleColor || "#000000"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-crosshair opacity-0"
                />
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(to bottom, 
                      rgba(255,255,255,1) 0%, 
                      rgba(255,255,255,0) 50%, 
                      rgba(0,0,0,1) 100%),
                      linear-gradient(to right, 
                      ${state.titleColor || "#000000"} 0%, 
                      rgba(255,255,255,0.5) 100%)`,
                  }}
                />
              </div>

              {/* Hue Slider */}
              <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max="360"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    const hue = e.target.value;
                    const color = `hsl(${hue}, 100%, 20%)`;
                    handleColorChange(color);
                  }}
                />
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                  }}
                />
              </div>

              {/* Hex Input */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={state.titleColor || "#000000"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                  placeholder="#000000"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(state.titleColor || "#000000");
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Suggested Colors */}
              <div>
                <p className="text-sm font-medium mb-2">Suggested</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-colors ${
                        state.titleColor === color
                          ? "border-black ring-2 ring-offset-2 ring-black"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                    />
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

export default TitleColorSection;