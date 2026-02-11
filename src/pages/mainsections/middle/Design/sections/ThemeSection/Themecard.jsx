import React from "react";
import { GradientPreview, PatternPreview, BlurPreview, VideoPreview } from "./ThemePreviews";

const ThemeCard = ({ theme, isSelected, onApply }) => {
  return (
    <div
      onClick={() => onApply(theme)}
      className={`rounded-2xl border-2 bg-white cursor-pointer transition-all hover:shadow-lg relative overflow-hidden group ${
        isSelected
          ? "border-black ring-2 ring-black"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Preview */}
      <div className="h-32 relative overflow-hidden">
        {theme.preview === "gradient" && <GradientPreview theme={theme} />}
        {theme.preview === "pattern" && <PatternPreview theme={theme} />}
        {theme.preview === "blur" && <BlurPreview theme={theme} />}
        {theme.preview === "video" && <VideoPreview theme={theme} />}

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      {/* Label */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-800">{theme.label}</p>
      </div>
    </div>
  );
};

export default ThemeCard;