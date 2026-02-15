import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const GradientControls = ({ design, updateDesign }) => {
  const [showGradientColorPicker, setShowGradientColorPicker] = useState(false);
  const suggestedColors = ["#000000", "#1a1a1a", "#7F2AEB", "#FF6B6B"];

  const handleColorChange = (color) => {
    updateDesign("gradientColor", color);
  };

  return (
    <>
      {/* Gradient Style */}
      <section>
        <label className="block text-sm font-semibold mb-4">Gradient style</label>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => updateDesign("gradientStyle", "custom")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              design.gradientStyle === "custom"
                ? "bg-white border-2 border-black"
                : "bg-[#F1F0EE] border-2 border-transparent hover:bg-gray-200"
            }`}
          >
            Custom
          </button>
          <button
            type="button"
            onClick={() => updateDesign("gradientStyle", "premade")}
            className={`px-6 py-3 rounded-full font-medium transition-all relative ${
              design.gradientStyle === "premade"
                ? "bg-white border-2 border-black"
                : "bg-[#F1F0EE] border-2 border-transparent hover:bg-gray-200"
            }`}
          >
            Pre-made
            <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
              ✓
            </span>
          </button>
        </div>
      </section>

      {/* Gradient Color (only show when custom) */}
      {design.gradientStyle === "custom" && (
        <section>
          <label className="block text-sm font-semibold mb-4">Gradient color</label>
          <div className="flex items-center gap-3">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
              type="text"
              placeholder="#666666"
              value={design.gradientColor || "#666666"}
              onChange={(e) => handleColorChange(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowGradientColorPicker(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
              style={{ backgroundColor: design.gradientColor || "#666666" }}
            />
          </div>

          <ColorPicker
            show={showGradientColorPicker}
            onClose={() => setShowGradientColorPicker(false)}
            value={design.gradientColor || "#666666"}
            onChange={handleColorChange}
            label="Gradient color"
            suggestedColors={suggestedColors}
          />
        </section>
      )}

      {/* Gradient Direction (only show when custom) */}
      {design.gradientStyle === "custom" && (
        <section>
          <label className="block text-sm font-semibold mb-4">Gradient direction</label>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => updateDesign("gradientDirection", "linear-up")}
                className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center ${
                  design.gradientDirection === "linear-up"
                    ? "border-2 border-black bg-white"
                    : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                }`}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
              <span className="mt-2 text-sm font-medium text-center">Linear up</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => updateDesign("gradientDirection", "linear-down")}
                className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center ${
                  design.gradientDirection === "linear-down"
                    ? "border-2 border-black bg-white"
                    : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                }`}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>
              <span className="mt-2 text-sm font-medium text-center">Linear down</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => updateDesign("gradientDirection", "radial")}
                className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center relative ${
                  design.gradientDirection === "radial"
                    ? "border-2 border-black bg-white"
                    : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                }`}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                  ✓
                </span>
              </button>
              <span className="mt-2 text-sm font-medium text-center">Radial</span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GradientControls;