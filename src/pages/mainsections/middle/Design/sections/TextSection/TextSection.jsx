import React, { useState } from "react";
import FontSelector from "./FontSelector";
import ColorSelector from "./ColorSelector";

const TextSection = ({ state, updateDesign }) => {
  const [showPageFontPicker, setShowPageFontPicker] = useState(false);
  const [showTitleFontPicker, setShowTitleFontPicker] = useState(false);
  const [showPageColorPicker, setShowPageColorPicker] = useState(false);
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);

  const handleFontSelect = (fontName, type) => {
    if (type === "page") {
      updateDesign("pageTextFont", fontName);
      setShowPageFontPicker(false);
    } else {
      updateDesign("titleFont", fontName);
      setShowTitleFontPicker(false);
    }
  };

  const handleColorChange = (color, type) => {
    if (type === "page") {
      updateDesign("pageTextColor", color);
    } else {
      updateDesign("titleFontColor", color);
    }
  };

  return (
    <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Text</h1>

      <div className="space-y-6 sm:space-y-8">
        {/* Page Text Font */}
        <FontSelector
          label="Page text font"
          selectedFont={state.pageTextFont || "Inter"}
          isOpen={showPageFontPicker}
          onToggle={() => setShowPageFontPicker(!showPageFontPicker)}
          onClose={() => setShowPageFontPicker(false)}
          onSelect={(fontName) => handleFontSelect(fontName, "page")}
        />

        {/* Page Text Color */}
        <ColorSelector
          label="Page text color"
          selectedColor={state.pageTextColor || "#FFFFFF"}
          isOpen={showPageColorPicker}
          onToggle={() => setShowPageColorPicker(!showPageColorPicker)}
          onClose={() => setShowPageColorPicker(false)}
          onChange={(color) => handleColorChange(color, "page")}
        />

        {/* Title Font */}
        <FontSelector
          label="Title font"
          selectedFont={state.titleFont || "Inter"}
          isOpen={showTitleFontPicker}
          onToggle={() => setShowTitleFontPicker(!showTitleFontPicker)}
          onClose={() => setShowTitleFontPicker(false)}
          onSelect={(fontName) => handleFontSelect(fontName, "title")}
        />

        {/* Title Font Color */}
        <ColorSelector
          label="Title font color"
          selectedColor={state.titleFontColor || "#000000"}
          isOpen={showTitleColorPicker}
          onToggle={() => setShowTitleColorPicker(!showTitleColorPicker)}
          onClose={() => setShowTitleColorPicker(false)}
          onChange={(color) => handleColorChange(color, "title")}
        />
      </div>
    </div>
  );
};

export default TextSection;