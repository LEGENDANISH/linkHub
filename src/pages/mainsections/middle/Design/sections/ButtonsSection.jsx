import React, { useState } from "react";

const ButtonsSection = ({ state, updateDesign }) => {
  const [showButtonColorPicker, setShowButtonColorPicker] = useState(false);
  const [showButtonTextColorPicker, setShowButtonTextColorPicker] = useState(false);

  // Suggested colors
  const suggestedColors = ["#EDD9FB", "#362630"];

  const handleColorChange = (color, type) => {
    if (type === "button") {
      updateDesign("buttonColor", color);
    } else {
      updateDesign("buttonTextColor", color);
    }
  };

  // Button style option component
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

  // Corner roundness option component
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

  // Shadow option component
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
    <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Buttons</h1>

      <div className="space-y-8 sm:space-y-10">
        {/* Button Style */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Button style
          </label>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <ButtonStyleOption
              value="solid"
              label="Solid"
              isSelected={state.buttonStyle === "solid"}
              onClick={() => updateDesign("buttonStyle", "solid")}
              isPro={false}
            />
            <ButtonStyleOption
              value="glass"
              label="Glass"
              isSelected={state.buttonStyle === "glass"}
              onClick={() => updateDesign("buttonStyle", "glass")}
              isPro={true}
            />
            <ButtonStyleOption
              value="outline"
              label="Outline"
              isSelected={state.buttonStyle === "outline"}
              onClick={() => updateDesign("buttonStyle", "outline")}
              isPro={false}
            />
          </div>
        </section>

        {/* Corner Roundness */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Corner roundness
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <CornerRoundnessOption
              value="square"
              label="Square"
              isSelected={state.cornerRoundness === "square"}
              onClick={() => updateDesign("cornerRoundness", "square")}
            />
            <CornerRoundnessOption
              value="round"
              label="Round"
              isSelected={state.cornerRoundness === "round"}
              onClick={() => updateDesign("cornerRoundness", "round")}
            />
            <CornerRoundnessOption
              value="rounder"
              label="Rounder"
              isSelected={state.cornerRoundness === "rounder"}
              onClick={() => updateDesign("cornerRoundness", "rounder")}
            />
            <CornerRoundnessOption
              value="full"
              label="Full"
              isSelected={state.cornerRoundness === "full"}
              onClick={() => updateDesign("cornerRoundness", "full")}
            />
          </div>
        </section>

        {/* Button Shadow */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Button shadow
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <ShadowOption
              value="none"
              label="None"
              isSelected={state.buttonShadow === "none"}
              onClick={() => updateDesign("buttonShadow", "none")}
            />
            <ShadowOption
              value="soft"
              label="Soft"
              isSelected={state.buttonShadow === "soft"}
              onClick={() => updateDesign("buttonShadow", "soft")}
            />
            <ShadowOption
              value="strong"
              label="Strong"
              isSelected={state.buttonShadow === "strong"}
              onClick={() => updateDesign("buttonShadow", "strong")}
            />
            <ShadowOption
              value="hard"
              label="Hard"
              isSelected={state.buttonShadow === "hard"}
              onClick={() => updateDesign("buttonShadow", "hard")}
            />
          </div>
        </section>

        {/* Button Color */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Button color
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
                type="text"
                placeholder="#EDD9FB"
                value={state.buttonColor || "#EDD9FB"}
                onChange={(e) => handleColorChange(e.target.value, "button")}
              />

              <button
                onClick={() => setShowButtonColorPicker(!showButtonColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: state.buttonColor || "#EDD9FB" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showButtonColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowButtonColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">
                      Button color
                    </label>

                    {/* Color Gradient Picker */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={state.buttonColor || "#EDD9FB"}
                        onChange={(e) => handleColorChange(e.target.value, "button")}
                        className="absolute inset-0 w-full h-full cursor-crosshair opacity-0"
                      />
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(to bottom, 
                            rgba(255,255,255,1) 0%, 
                            rgba(255,255,255,0) 50%, 
                            rgba(0,0,0,1) 100%),
                            linear-gradient(to right, 
                            ${state.buttonColor || "#EDD9FB"} 0%, 
                            rgba(255,255,255,0.5) 100%)`,
                        }}
                      />
                    </div>

                    {/* Hue Slider */}
                    <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 cursor-pointer">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const hue = e.target.value;
                          const color = `hsl(${hue}, 70%, 85%)`;
                          handleColorChange(color, "button");
                        }}
                      />
                      <div
                        className="w-full h-full"
                        style={{
                          background:
                            "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                        }}
                      />
                    </div>

                    {/* Hex Input */}
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={state.buttonColor || "#EDD9FB"}
                        onChange={(e) => handleColorChange(e.target.value, "button")}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                        placeholder="#EDD9FB"
                      />
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Suggested Colors */}
                    <div>
                      <p className="text-sm font-medium mb-2">Suggested</p>
                      <div className="flex gap-2">
                        {suggestedColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color, "button")}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Button Text Color */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Button text color
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
                type="text"
                placeholder="#362630"
                value={state.buttonTextColor || "#362630"}
                onChange={(e) => handleColorChange(e.target.value, "text")}
              />

              <button
                onClick={() => setShowButtonTextColorPicker(!showButtonTextColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: state.buttonTextColor || "#362630" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showButtonTextColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowButtonTextColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">
                      Button text color
                    </label>

                    {/* Color Gradient Picker */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={state.buttonTextColor || "#362630"}
                        onChange={(e) => handleColorChange(e.target.value, "text")}
                        className="absolute inset-0 w-full h-full cursor-crosshair opacity-0"
                      />
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(to bottom, 
                            rgba(255,255,255,1) 0%, 
                            rgba(255,255,255,0) 50%, 
                            rgba(0,0,0,1) 100%),
                            linear-gradient(to right, 
                            ${state.buttonTextColor || "#362630"} 0%, 
                            rgba(255,255,255,0.5) 100%)`,
                        }}
                      />
                    </div>

                    {/* Hue Slider */}
                    <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 cursor-pointer">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const hue = e.target.value;
                          const color = `hsl(${hue}, 100%, 20%)`;
                          handleColorChange(color, "text");
                        }}
                      />
                      <div
                        className="w-full h-full"
                        style={{
                          background:
                            "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                        }}
                      />
                    </div>

                    {/* Hex Input */}
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={state.buttonTextColor || "#362630"}
                        onChange={(e) => handleColorChange(e.target.value, "text")}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                        placeholder="#362630"
                      />
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Suggested Colors */}
                    <div>
                      <p className="text-sm font-medium mb-2">Suggested</p>
                      <div className="flex gap-2">
                        {suggestedColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color, "text")}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonsSection;