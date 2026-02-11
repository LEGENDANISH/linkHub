import React from "react";

const ShadowSelector = ({ selectedShadow, onShadowChange }) => {
  const ShadowOption = ({ value, label, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all ${
        isSelected
          ? "border-black bg-white"
          : "border-transparent bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Button shadow</label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <ShadowOption
          value="none"
          label="None"
          isSelected={selectedShadow === "none"}
          onClick={() => onShadowChange("none")}
        />
        <ShadowOption
          value="soft"
          label="Soft"
          isSelected={selectedShadow === "soft"}
          onClick={() => onShadowChange("soft")}
        />
        <ShadowOption
          value="strong"
          label="Strong"
          isSelected={selectedShadow === "strong"}
          onClick={() => onShadowChange("strong")}
        />
        <ShadowOption
          value="hard"
          label="Hard"
          isSelected={selectedShadow === "hard"}
          onClick={() => onShadowChange("hard")}
        />
      </div>
    </section>
  );
};

export default ShadowSelector;