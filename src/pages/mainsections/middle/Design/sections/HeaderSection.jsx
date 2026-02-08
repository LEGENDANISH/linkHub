import React, { useState } from "react";
import { User } from "lucide-react";

/**
 * Reusable option button component matching the reference design
 * Accepts custom SVG icons as children
 */
const OptionButton = ({ selected, onClick, icon, isPro }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full min-h-1 rounded-2xl bg-[#F1F0EE] transition-all 
      flex items-center justify-center
      focus:outline-none focus:ring-2 focus:ring-black
      ${selected ? "border-0 border-black bg-white" : "hover:bg-gray-200"}
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


const HeaderSection = ({ state, updateDesign }) => {
  const [showTitleFontPicker, setShowTitleFontPicker] = useState(false);
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);

  // Available fonts
  const fonts = [
    { name: "Albert Sans", isPro: false },
    { name: "Belanosima", isPro: true },
    { name: "Bricolage Grotesque", isPro: true, proLevel: 4 },
    { name: "DM Sans", isPro: false },
    { name: "Epilogue", isPro: false },
    { name: "IBM Plex Sans", isPro: false },
    { name: "Inter", isPro: false },
    { name: "Lato", isPro: true },
    { name: "Link Sans", isPro: false },
    { name: "M Plus Rounded", isPro: true },
    { name: "Manrope", isPro: false },
    { name: "Oxanium", isPro: false },
    { name: "Poppins", isPro: true, proLevel: 4 },
    { name: "Red Hat Display", isPro: false },
    { name: "Roboto", isPro: true, proLevel: 4 },
    { name: "Rubik", isPro: true },
    { name: "Space Grotesk", isPro: true, proLevel: 4 },
    { name: "Syne", isPro: true },
  ];

  const suggestedColors = ["#000000", "#1a1a1a"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateDesign("profileImage", imageUrl);
    }
  };

  const handleFontSelect = (fontName) => {
    updateDesign("titleFont", fontName);
    setShowTitleFontPicker(false);
  };

  const handleColorChange = (color) => {
    updateDesign("titleColor", color);
  };

  // SVG Icons - These can be replaced with your custom SVGs
  const ClassicLayoutIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 18.5c0-1.5 1.5-3 5-3s5 1.5 5 3" />
    </svg>
  );

  const HeroLayoutIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );

  const TextStyleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </svg>
  );

  const LogoStyleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );

  const SmallSizeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </svg>
  );

  const LargeSizeIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </svg>
  );

  return (
    <div className="max-w-3xl bg-[#FBFAF9] w-full px-4 sm:px-6 lg:px-8">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Header</h1>

      <div className="space-y-8 sm:space-y-10">
        {/* PROFILE IMAGE */}
        <section>
          <label className="block text-sm font-semibold mb-4">Profile image</label>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
              {state.profileImage ? (
                <img
                  src={state.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} className="text-gray-400" />
              )}
            </div>

            <label className="border-2 border-black px-5 sm:px-6 py-2.5 bg-black text-white rounded-full cursor-pointer font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
              + Add
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {state.profileImage && (
              <button
                onClick={() => updateDesign("profileImage", null)}
                className="border-2 border-gray-300 px-5 sm:px-6 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Remove
              </button>
            )}
          </div>
        </section>

        {/* PROFILE IMAGE LAYOUT */}
      <section>
  <label className="block text-sm font-semibold mb-4">
    Profile image layout
  </label>

  <div className="grid grid-cols-2 gap-3 sm:gap-4">

    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.profileLayout === "classic"}
        onClick={() => updateDesign("profileLayout", "classic")}
        icon={<ClassicLayoutIcon />}
        isPro={false}
      />
      <span className="mt-2 text-sm font-medium">Classic</span>
    </div>

    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.profileLayout === "hero"}
        onClick={() => updateDesign("profileLayout", "hero")}
        icon={<HeroLayoutIcon />}
        isPro={true}
      />
      <span className="mt-2 text-sm font-medium">Hero</span>
    </div>

  </div>
</section>


        {/* TITLE */}
        <section>
          <label className="block text-sm font-semibold mb-4">Title</label>

          <input
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your name"
            value={state.title || ""}
            onChange={(e) => updateDesign("title", e.target.value)}
          />
        </section>

        {/* TITLE STYLE */}
<section>
  <label className="block text-sm font-semibold mb-4">
    Title style
  </label>

  <div className="grid grid-cols-2 gap-3 sm:gap-4">

    {/* TEXT */}
    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.titleStyle === "text"}
        onClick={() => updateDesign("titleStyle", "text")}
        icon={<TextStyleIcon />}
        isPro={false}
      />
      <span className="mt-3 text-sm font-medium">Text</span>
    </div>

    {/* LOGO */}
    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.titleStyle === "logo"}
        onClick={() => updateDesign("titleStyle", "logo")}
        icon={<LogoStyleIcon />}
        isPro={true}
      />
      <span className="mt-3 text-sm font-medium">Logo</span>
    </div>

  </div>
</section>


        {/* SIZE */}
      <section>
  <label className="block text-sm font-semibold mb-4">Size</label>

  <div className="grid grid-cols-2 gap-3 sm:gap-4">

    {/* SMALL */}
    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.titleSize === "small"}
        onClick={() => updateDesign("titleSize", "small")}
        icon={<SmallSizeIcon />}
        isPro={false}
      />
      <span className="mt-3 text-sm font-medium">Small</span>
    </div>

    {/* LARGE */}
    <div className="flex flex-col items-center">
      <OptionButton
        selected={state.titleSize === "large"}
        onClick={() => updateDesign("titleSize", "large")}
        icon={<LargeSizeIcon />}
        isPro={true}
      />
      <span className="mt-3 text-sm font-medium">Large</span>
    </div>

  </div>
</section>
            

        {/* TITLE FONT */}
        <section>
          <label className="block text-sm font-semibold mb-4">Title font</label>

          <div className="relative">
            <button
              onClick={() => setShowTitleFontPicker(!showTitleFontPicker)}
              className="w-full h-12 border border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-between bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <span className="text-base sm:text-lg">
                {state.titleFont || "Inter"}
              </span>
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

            {/* Font Picker Modal */}
            {showTitleFontPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowTitleFontPicker(false)}
                />
                <div className="fixed inset-0 sm:inset-auto sm:absolute sm:top-full sm:left-0 sm:right-0 sm:mt-2 bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl z-50 max-h-[80vh] sm:max-h-96 overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-1 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
                    <h3 className="text-lg font-semibold">Title font</h3>
                    <button
                      onClick={() => setShowTitleFontPicker(false)}
                      className="w-8 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full  transition-colors"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-4">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => handleFontSelect(font.name)}
                        className={`p-3 sm:p-4 rounded-xl text-left transition-all relative ${
                          state.titleFont === font.name
                            ? "bg-white border-2 border-black"
                            : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium">
                          {font.name}
                        </span>
                        {font.isPro && (
                          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                            {font.proLevel ? font.proLevel : "✓"}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* TITLE FONT COLOR */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            Title font color
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl  sm:p-2 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
                type="text"
                placeholder="#000000"
                value={state.titleColor || "#000000"}
                onChange={(e) => handleColorChange(e.target.value)}
              />

              <button
                onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: state.titleColor || "#000000" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showTitleColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowTitleColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">
                      Title font color
                    </label>

                    {/* Color Gradient Picker */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={state.titleColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value)}
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
                            ${state.titleColor || "#000000"} 0%, 
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
                          handleColorChange(color);
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
                        value={state.titleColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                        placeholder="#000000"
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
                            onClick={() => handleColorChange(color)}
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

export default HeaderSection;