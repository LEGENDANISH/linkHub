import React from "react";

const PatternOption = ({ value, label, isPro, isSelected, onClick }) => (
  <div className="flex flex-col items-center">
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full aspect-square rounded-2xl transition-all overflow-hidden ${
        isSelected
          ? "border-2 border-black bg-white"
          : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
      }`}
    >
      {value === "grid" && (
        <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-gray-400 rounded-sm" />
          ))}
        </div>
      )}
      {value === "morph" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-200 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-pulse" />
        </div>
      )}
      {value === "organic" && (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            <path d="M20,50 Q30,20 50,30 T80,50 Q70,80 50,70 T20,50" fill="#D1D5DB" />
          </svg>
        </div>
      )}
      {value === "matrix" && (
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}
      {isPro && (
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
    </button>
    <span className="mt-2 text-sm font-medium text-center">{label}</span>
  </div>
);

export default PatternOption;