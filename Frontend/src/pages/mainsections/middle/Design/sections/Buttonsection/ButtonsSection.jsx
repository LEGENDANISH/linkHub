import React, { useState } from "react";
import ButtonStyleSelector from "./ButtonStyleSelector";
import CornerRoundnessSelector from "./CornerRoundnessSelector";
import ShadowSelector from "./Shadowselector";
import ColorPicker from "./ColorPicker";

const ButtonsSection = ({ state, updateDesign }) => {
  const [showButtonColorPicker, setShowButtonColorPicker] = useState(false);
  const [showButtonTextColorPicker, setShowButtonTextColorPicker] = useState(false);

  const handleColorChange = (color, type) => {
    if (type === "button") {
      updateDesign("buttonColor", color);
    } else {
      updateDesign("buttonTextColor", color);
    }
  };

  return (
    <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 pb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Buttons</h1>

      <div className="space-y-8 sm:space-y-10">
        {/* Button Style */}
        <ButtonStyleSelector
          selectedStyle={state.buttonStyle}
          onStyleChange={(style) => updateDesign("buttonStyle", style)}
        />

        {/* Corner Roundness */}
        <CornerRoundnessSelector
          selectedRoundness={state.cornerRoundness}
          onRoundnessChange={(roundness) => updateDesign("cornerRoundness", roundness)}
        />

        {/* Button Shadow */}
        <ShadowSelector
          selectedShadow={state.buttonShadow}
          onShadowChange={(shadow) => updateDesign("buttonShadow", shadow)}
        />

        {/* Button Color */}
        <ColorPicker
          label="Button color"
          color={state.buttonColor || "#EDD9FB"}
          defaultColor="#EDD9FB"
          onColorChange={(color) => handleColorChange(color, "button")}
          showPicker={showButtonColorPicker}
          setShowPicker={setShowButtonColorPicker}
        />

        {/* Button Text Color */}
        <ColorPicker
          label="Button text color"
          color={state.buttonTextColor || "#362630"}
          defaultColor="#362630"
          onColorChange={(color) => handleColorChange(color, "text")}
          showPicker={showButtonTextColorPicker}
          setShowPicker={setShowButtonTextColorPicker}
          isTextColor={true}
        />
      </div>
    </div>
  );
};

export default ButtonsSection;