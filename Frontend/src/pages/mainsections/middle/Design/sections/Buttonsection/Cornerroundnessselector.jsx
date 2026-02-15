import React from "react";

const CornerRoundnessSelector = ({ selectedRoundness, onRoundnessChange }) => {
  const CornerRoundnessOption = ({ value, label, isSelected, onClick }) => {
    const getCornerStyle = () => {
      switch (value) {
        case "square":
          return "rounded-none";
        case "round":
          return "rounded-lg";
        case "rounder":
          return "rounded-2xl";
        case "full":
          return "rounded-full";
        default:
          return "rounded-none";
      }
    };

    return (
      <button
        onClick={onClick}
        className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all ${
          isSelected
            ? "border-black bg-white"
            : "border-transparent bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Corner Preview - showing top-right corner */}
          <div className="w-full h-12 sm:h-14 flex items-start justify-end p-2">
            <div
              className={`w-12 h-12 border-t-4 border-r-4 border-black ${getCornerStyle()}`}
            />
          </div>
          <span className="text-xs sm:text-sm font-medium">{label}</span>
        </div>
      </button>
    );
  };

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Corner roundness</label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <CornerRoundnessOption
          value="square"
          label="Square"
          isSelected={selectedRoundness === "square"}
          onClick={() => onRoundnessChange("square")}
        />
        <CornerRoundnessOption
          value="round"
          label="Round"
          isSelected={selectedRoundness === "round"}
          onClick={() => onRoundnessChange("round")}
        />
        <CornerRoundnessOption
          value="rounder"
          label="Rounder"
          isSelected={selectedRoundness === "rounder"}
          onClick={() => onRoundnessChange("rounder")}
        />
        <CornerRoundnessOption
          value="full"
          label="Full"
          isSelected={selectedRoundness === "full"}
          onClick={() => onRoundnessChange("full")}
        />
      </div>
    </section>
  );
};

export default CornerRoundnessSelector;