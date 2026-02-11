import React from "react";
import EffectOption from "./EffectOption";

const ImageControls = ({ design, updateDesign }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image is too large (max 5MB). Please use a smaller image.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign("backgroundImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Background Image */}
      <section>
        <label className="block text-sm font-semibold mb-4">Background image</label>
        <div className="flex flex-col gap-4">
          {design.backgroundImage && (
            <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
              <img
                src={design.backgroundImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <label className="flex-1 border-2 border-gray-300 px-5 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {design.backgroundImage ? "Change Image" : "Upload Image"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {design.backgroundImage && (
              <button
                type="button"
                onClick={() => updateDesign("backgroundImage", null)}
                className="border-2 border-red-300 px-5 py-2.5 bg-white text-red-600 rounded-full cursor-pointer font-medium hover:bg-red-50 transition-colors text-sm sm:text-base"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Effect */}
      <section>
        <label className="block text-sm font-semibold mb-4">Effect</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <EffectOption
            value="none"
            label="None"
            isSelected={design.imageEffect === "none"}
            onClick={() => updateDesign("imageEffect", "none")}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            }
          />
          <EffectOption
            value="mono"
            label="Mono"
            isSelected={design.imageEffect === "mono"}
            onClick={() => updateDesign("imageEffect", "mono")}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m0-6h6m-6 0H6" />
              </svg>
            }
          />
          <EffectOption
            value="blur"
            label="Blur"
            isSelected={design.imageEffect === "blur"}
            onClick={() => updateDesign("imageEffect", "blur")}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            }
          />
          <EffectOption
            value="halftone"
            label="Halftone"
            isSelected={design.imageEffect === "halftone"}
            onClick={() => updateDesign("imageEffect", "halftone")}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                <circle cx="16" cy="8" r="1" fill="currentColor" />
                <circle cx="8" cy="16" r="1" fill="currentColor" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Tint */}
      <section>
        <label className="block text-sm font-semibold mb-2">Tint</label>
        <p className="text-xs text-gray-600 mb-4">
          Improves text visibility and helps make your content more accessible
        </p>
        <div className="flex items-center gap-4">
          <svg className="w-5 h-5 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>

          <input
            type="range"
            min="0"
            max="100"
            value={design.imageTint || 0}
            onChange={(e) => updateDesign("imageTint", parseInt(e.target.value))}
            className="flex-1"
          />

          <svg className="w-5 h-5 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>

          <span className="text-sm font-medium w-12 text-right">{design.imageTint || 0}%</span>
        </div>
      </section>
    </>
  );
};

export default ImageControls;