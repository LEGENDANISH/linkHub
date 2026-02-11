import React from "react";
import { suggestedColors } from "./colors";

const ColorPickerModal = ({ label, selectedColor, onClose, onChange }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal - Centered on screen */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-5">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-3">{label}</label>

          {/* Color Gradient Picker */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onChange(e.target.value)}
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
                  ${selectedColor} 0%, 
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
                onChange(color);
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
              value={selectedColor}
              onChange={(e) => onChange(e.target.value)}
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
                  onClick={() => onChange(color)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Close button at bottom for mobile */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors sm:hidden"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default ColorPickerModal;