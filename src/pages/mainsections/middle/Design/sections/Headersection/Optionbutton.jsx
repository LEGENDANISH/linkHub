import React from "react";

/**
 * Reusable option button component matching the reference design
 * Accepts custom SVG icons as children
 */
const OptionButton = ({ selected, onClick, icon, isPro }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full min-h-[80px] rounded-2xl bg-[#F1F0EE] transition-all 
      flex items-center justify-center
      focus:outline-none focus:ring-2 focus:ring-black
      ${selected ? "border-2 border-black bg-white" : "hover:bg-gray-200"}
      `}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {isPro && (
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
    </button>
  );
};

export default OptionButton;