import React from "react";
import ProWrapper from "../../../../../../wrapper/ProGate";

const ButtonStyleSelector = ({ selectedStyle, onStyleChange }) => {
  const ButtonStyleOption = ({ value, label, isSelected, onClick, isPro }) => (
    <button
      onClick={onClick}
      className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all ${
        isSelected
          ? "border-black bg-white"
          : "border-transparent bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Button Preview */}
        <div
          className={`w-full h-12 sm:h-14 bg-gray-300 ${
            value === "solid"
              ? "rounded-xl"
              : value === "glass"
              ? "rounded-xl bg-gradient-to-b from-white/40 to-gray-200/40 backdrop-blur-sm border border-white/50"
              : "rounded-xl border-2 border-gray-400 bg-transparent"
          }`}
        />
        <span className="text-xs sm:text-sm font-medium">{label}</span>
      </div>
      
      {isPro && (
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
    </button>
  );

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Button style</label>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <ProWrapper label="Solid style">
          <ButtonStyleOption
            isPro={false}
            value="solid"
            label="Solid"
            isSelected={selectedStyle === "solid"}
            onClick={() => onStyleChange("solid")}
          />
        </ProWrapper>
        <ProWrapper label="Glass style">
          <ButtonStyleOption
            isPro={true}
            value="glass"
            label="Glass"
            isSelected={selectedStyle === "glass"}
            onClick={() => onStyleChange("glass")}
          />
        </ProWrapper>
        <ProWrapper label="Outline style">
          <ButtonStyleOption
            isPro={false}
            value="outline"
            label="Outline"
            isSelected={selectedStyle === "outline"}
            onClick={() => onStyleChange("outline")}
          />
        </ProWrapper>
      </div>
    </section>
  );
};

export default ButtonStyleSelector;