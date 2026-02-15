import React from "react";

const EffectOption = ({ value, label, icon, isSelected, onClick }) => (
  <div className="flex flex-col items-center">
    <button
      type="button"
      onClick={onClick}
      className={`relative px-6 sm:px-8 py-3 rounded-full transition-all ${
        isSelected
          ? "border-2 border-black bg-white"
          : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
      </div>
    </button>
    <span className="mt-2 text-sm font-medium text-center">{label}</span>
  </div>
);

export default EffectOption;