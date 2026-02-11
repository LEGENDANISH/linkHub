import React from "react";

const WallpaperStyleOption = ({ value, label, icon, isPro, isSelected, onClick }) => (
  <div className="flex flex-col items-center">
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full aspect-square rounded-2xl transition-all ${
        isSelected
          ? "border-2 border-black bg-white"
          : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
      }`}
    >
      <div className="flex items-center justify-center h-full">
        {icon}
      </div>
      {isPro && (
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
    </button>
    <span className="mt-2 text-sm font-medium text-center">{label}</span>
  </div>
);

export default WallpaperStyleOption;