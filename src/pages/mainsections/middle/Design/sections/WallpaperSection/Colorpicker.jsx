import React from "react";

const ColorPicker = ({ 
  show, 
  onClose, 
  value, 
  onChange, 
  label = "Color",
  suggestedColors = ["#000000", "#1a1a1a", "#7F2AEB", "#FF6B6B"]
}) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">{label}</label>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Color Gradient Selector */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
              <input
                type="color"
                value={value || "#000000"}
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
                    ${value || "#000000"} 0%, 
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
                  const color = `hsl(${hue}, 70%, 50%)`;
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
                value={value || "#000000"}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                placeholder="#000000"
              />
            </div>

            {/* Suggested Colors */}
            <div>
              <p className="text-sm font-medium mb-2">Suggested</p>
              <div className="flex gap-2 flex-wrap">
                {suggestedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChange(color)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;