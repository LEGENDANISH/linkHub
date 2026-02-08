import React, { useState } from "react";

const TextSection = ({ state, updateDesign }) => {
  const [showPageFontPicker, setShowPageFontPicker] = useState(false);
  const [showTitleFontPicker, setShowTitleFontPicker] = useState(false);
  const [showPageColorPicker, setShowPageColorPicker] = useState(false);
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);

  // Available fonts
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

  // Suggested colors
  const suggestedColors = ["#000000", "#1a1a1a"];

  const handleFontSelect = (fontName, type) => {
    if (type === "page") {
      updateDesign("pageTextFont", fontName);
      setShowPageFontPicker(false);
    } else {
      updateDesign("titleFont", fontName);
      setShowTitleFontPicker(false);
    }
  };

  const handleColorChange = (color, type) => {
    if (type === "page") {
      updateDesign("pageTextColor", color);
    } else {
      updateDesign("titleFontColor", color);
    }
  };

  return (
    <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Text</h1>

      <div className="space-y-6 sm:space-y-8">
        {/* Page Text Font */}
        <section>
          <label className="block text-sm font-semibold mb-3 sm:mb-4">
            Page text font
          </label>

          <div className="relative">
            <button
              onClick={() => setShowPageFontPicker(!showPageFontPicker)}
              className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-between bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <span className="text-base sm:text-lg">
                {state.pageTextFont || "Inter"}
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
            {showPageFontPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowPageFontPicker(false)}
                />
                <div className="fixed inset-0 sm:inset-auto sm:absolute sm:top-full sm:left-0 sm:right-0 sm:mt-2 bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl z-50 max-h-[80vh] sm:max-h-96 overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
                    <h3 className="text-lg font-semibold">Page text font</h3>
                    <button
                      onClick={() => setShowPageFontPicker(false)}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-4">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => handleFontSelect(font.name, "page")}
                        className={`p-3 sm:p-4 rounded-xl text-left transition-all relative ${
                          state.pageTextFont === font.name
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
              </>
            )}
          </div>
        </section>

        {/* Page Text Color */}
        <section>
          <label className="block text-sm font-semibold mb-3 sm:mb-4">
            Page text color
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white"
                type="text"
                placeholder="#FFFFFF"
                value={state.pageTextColor || "#FFFFFF"}
                onChange={(e) => handleColorChange(e.target.value, "page")}
              />

              <button
                onClick={() => setShowPageColorPicker(!showPageColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: state.pageTextColor || "#FFFFFF" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showPageColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowPageColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">
                      Page text color
                    </label>

                    {/* Color Gradient Picker */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={state.pageTextColor || "#FFFFFF"}
                        onChange={(e) => handleColorChange(e.target.value, "page")}
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
                            ${state.pageTextColor || "#FF0000"} 0%, 
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
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const hue = e.target.value;
                          const color = `hsl(${hue}, 100%, 50%)`;
                          handleColorChange(color, "page");
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
                        value={state.pageTextColor || "#FFFFFF"}
                        onChange={(e) => handleColorChange(e.target.value, "page")}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="#FFFFFF"
                      />
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Suggested Colors */}
                    <div>
                      <p className="text-sm font-medium mb-2">Suggested</p>
                      <div className="flex gap-2">
                        {suggestedColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color, "page")}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Title Font */}
        <section>
          <label className="block text-sm font-semibold mb-3 sm:mb-4">
            Title font
          </label>

          <div className="relative">
            <button
              onClick={() => setShowTitleFontPicker(!showTitleFontPicker)}
              className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-between bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
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
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowTitleFontPicker(false)}
                />
                <div className="fixed inset-0 sm:inset-auto sm:absolute sm:top-full sm:left-0 sm:right-0 sm:mt-2 bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl z-50 max-h-[80vh] sm:max-h-96 overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-4">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => handleFontSelect(font.name, "title")}
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
              </>
            )}
          </div>
        </section>

        {/* Title Font Color */}
        <section>
          <label className="block text-sm font-semibold mb-3 sm:mb-4">
            Title font color
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white"
                type="text"
                placeholder="#000000"
                value={state.titleFontColor || "#000000"}
                onChange={(e) => handleColorChange(e.target.value, "title")}
              />

              <button
                onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: state.titleFontColor || "#000000" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showTitleColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowTitleColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">
                      Title font color
                    </label>

                    {/* Color Gradient Picker */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={state.titleFontColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value, "title")}
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
                            ${state.titleFontColor || "#FF0000"} 0%, 
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
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const hue = e.target.value;
                          const color = `hsl(${hue}, 100%, 50%)`;
                          handleColorChange(color, "title");
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
                        value={state.titleFontColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value, "title")}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="#000000"
                      />
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Suggested Colors */}
                    <div>
                      <p className="text-sm font-medium mb-2">Suggested</p>
                      <div className="flex gap-2">
                        {suggestedColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color, "title")}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TextSection;