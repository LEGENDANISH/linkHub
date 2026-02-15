import React from "react";
import ColorPickerModal from "./ColorPickerModal";

const ColorSelector = ({ label, selectedColor, isOpen, onToggle, onClose, onChange }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-3 sm:mb-4">
        {label}
      </label>

      <div className="relative">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white"
            type="text"
            placeholder={selectedColor}
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
          />

          <button
            onClick={onToggle}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        {isOpen && (
          <ColorPickerModal
            label={label}
            selectedColor={selectedColor}
            onClose={onClose}
            onChange={onChange}
          />
        )}
      </div>
    </section>
  );
};

export default ColorSelector;