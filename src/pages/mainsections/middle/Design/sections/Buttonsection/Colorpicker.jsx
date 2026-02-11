import React, { useRef, useEffect } from "react";

const ColorPicker = ({
  label,
  color,
  defaultColor,
  onColorChange,
  showPicker,
  setShowPicker,
  isTextColor = false,
}) => {
  const pickerRef = useRef(null);
  const suggestedColors = ["#EDD9FB", "#362630"];

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker, setShowPicker]);

  return (
    <section className="relative">
      <label className="block text-sm font-semibold mb-4">{label}</label>

      <div className="flex items-center gap-3">
        <input
          className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
          type="text"
          placeholder={defaultColor}
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Color Picker Modal - Centered on mobile, positioned below on desktop */}
      {showPicker && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={() => setShowPicker(false)}
          />
          
          {/* Modal */}
          <div
            ref={pickerRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md sm:absolute sm:top-full sm:left-0 sm:translate-x-0 sm:translate-y-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-5 sm:p-6"
          >
            <div>
              <label className="block text-sm font-semibold mb-3">{label}</label>

              {/* Color Gradient Picker */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
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
                      ${color} 0%, 
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
                    const color = isTextColor
                      ? `hsl(${hue}, 100%, 20%)`
                      : `hsl(${hue}, 70%, 85%)`;
                    onColorChange(color);
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
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                  placeholder={defaultColor}
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
                  {suggestedColors.map((suggestedColor) => (
                    <button
                      key={suggestedColor}
                      onClick={() => onColorChange(suggestedColor)}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: suggestedColor }}
                    />
                  ))}
                </div>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setShowPicker(false)}
                className="mt-4 w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors sm:hidden"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ColorPicker;