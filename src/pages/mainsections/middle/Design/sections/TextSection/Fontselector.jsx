import React from "react";
import { fonts } from "./fonts";
import FontPickerModal from "./FontPickerModal";

const FontSelector = ({ label, selectedFont, isOpen, onToggle, onClose, onSelect }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-3 sm:mb-4">
        {label}
      </label>

      <div className="relative">
        <button
          onClick={onToggle}
          className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-between bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
        >
          <span className="text-base sm:text-lg">{selectedFont}</span>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <FontPickerModal
            label={label}
            selectedFont={selectedFont}
            fonts={fonts}
            onClose={onClose}
            onSelect={onSelect}
          />
        )}
      </div>
    </section>
  );
};

export default FontSelector;