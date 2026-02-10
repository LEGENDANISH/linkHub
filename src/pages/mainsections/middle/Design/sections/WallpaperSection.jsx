import React, { useState, useEffect } from "react";
import { useDesign } from "../DesignSelectionManager";

const WallpaperSection = () => {
  // ✅ FIXED: Use Zustand directly instead of props
  const { design, updateDesign } = useDesign();
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGradientColorPicker, setShowGradientColorPicker] = useState(false);

  // Initialize default values when component mounts or wallpaper style changes
  useEffect(() => {
    // Set default wallpaper style if not set
    if (!design.wallpaperStyle) {
      updateDesign("wallpaperStyle", "fill");
    }

    // Set default background color if not set
    if (!design.backgroundColor) {
      updateDesign("backgroundColor", "#000000");
    }

    // Set defaults for gradient
    if (design.wallpaperStyle === "gradient") {
      if (!design.gradientStyle) {
        updateDesign("gradientStyle", "custom");
      }
      if (!design.gradientDirection) {
        updateDesign("gradientDirection", "linear-down");
      }
      if (!design.gradientColor) {
        updateDesign("gradientColor", "#666666");
      }
    }

    // Set defaults for pattern
    if (design.wallpaperStyle === "pattern" && !design.pattern) {
      updateDesign("pattern", "grid");
    }

    // Set defaults for image
    if (design.wallpaperStyle === "image" && !design.imageEffect) {
      updateDesign("imageEffect", "none");
    }

    // Set default for noise
    if (design.noise === undefined) {
      updateDesign("noise", false);
    }

    // Set default for image tint
    if (design.imageTint === undefined) {
      updateDesign("imageTint", 0);
    }
  }, [design.wallpaperStyle]);

  // Suggested colors
  const suggestedColors = ["#000000", "#1a1a1a", "#7F2AEB", "#FF6B6B"];

  const handleColorChange = (color, type = "background") => {
    if (type === "gradient") {
      updateDesign("gradientColor", color);
    } else {
      updateDesign("backgroundColor", color);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB for localStorage)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image is too large (max 5MB). Please use a smaller image.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign("backgroundImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB for localStorage)
      if (file.size > 5 * 1024 * 1024) {
        alert("Video is too large (max 5MB). Please use a smaller video.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign("backgroundVideo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Wallpaper style option component
  const WallpaperStyleOption = ({ value, label, icon, isPro, isSelected, onClick }) => (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full aspect-square rounded-2xl transition-all ${
          isSelected
            ? "border-2 border-black bg-white"
            : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {icon}
        </div>
        {isPro && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
            ✓
          </span>
        )}
      </button>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );

  // Pattern option component
  const PatternOption = ({ value, label, isPro, isSelected, onClick }) => (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full aspect-square rounded-2xl transition-all overflow-hidden ${
          isSelected
            ? "border-2 border-black bg-white"
            : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
        }`}
      >
        {value === "grid" && (
          <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border border-gray-400 rounded-sm" />
            ))}
          </div>
        )}
        {value === "morph" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-200 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-pulse" />
          </div>
        )}
        {value === "organic" && (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-20 h-20">
              <path d="M20,50 Q30,20 50,30 T80,50 Q70,80 50,70 T20,50" fill="#D1D5DB" />
            </svg>
          </div>
        )}
        {value === "matrix" && (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        )}
        {isPro && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
            ✓
          </span>
        )}
      </button>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );

  // Effect option component
  const EffectOption = ({ value, label, icon, isSelected, onClick }) => (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`relative px-8 py-3 rounded-full transition-all ${
          isSelected
            ? "border-2 border-black bg-white"
            : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon}
        </div>
      </button>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Wallpaper</h1>

      <div className="space-y-8 sm:space-y-10">
        {/* Wallpaper Style */}
        <section>
          <label className="block text-sm font-semibold mb-4">Wallpaper style</label>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            <WallpaperStyleOption
              value="fill"
              label="Fill"
              isSelected={design.wallpaperStyle === "fill"}
              onClick={() => {
                updateDesign("wallpaperStyle", "fill");
              }}
              icon={
                <div className="w-16 h-16 bg-black rounded-xl" />
              }
            />
            <WallpaperStyleOption
              value="gradient"
              label="Gradient"
              isSelected={design.wallpaperStyle === "gradient"}
              onClick={() => {
                updateDesign("wallpaperStyle", "gradient");
                // Set defaults if not already set
                setTimeout(() => {
                  if (!design.gradientStyle) updateDesign("gradientStyle", "custom");
                  if (!design.gradientDirection) updateDesign("gradientDirection", "linear-down");
                  if (!design.gradientColor) updateDesign("gradientColor", "#666666");
                }, 0);
              }}
              icon={
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-400 rounded-xl" />
              }
            />
            <WallpaperStyleOption
              value="blur"
              label="Blur"
              isSelected={design.wallpaperStyle === "blur"}
              onClick={() => updateDesign("wallpaperStyle", "blur")}
              icon={
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 rounded-xl blur-sm" />
              }
            />
            <WallpaperStyleOption
              value="pattern"
              label="Pattern"
              isSelected={design.wallpaperStyle === "pattern"}
              onClick={() => {
                updateDesign("wallpaperStyle", "pattern");
                setTimeout(() => {
                  if (!design.pattern) updateDesign("pattern", "grid");
                }, 0);
              }}
              icon={
                <div className="w-16 h-16 grid grid-cols-2 gap-1">
                  <div className="border-2 border-black rounded" />
                  <div className="border-2 border-black rounded" />
                  <div className="border-2 border-black rounded" />
                  <div className="border-2 border-black rounded" />
                </div>
              }
            />
            <WallpaperStyleOption
              value="image"
              label="Image"
              isSelected={design.wallpaperStyle === "image"}
              onClick={() => {
                updateDesign("wallpaperStyle", "image");
                setTimeout(() => {
                  if (!design.imageEffect) updateDesign("imageEffect", "none");
                }, 0);
              }}
              icon={
                <div className="w-16 h-16 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-600 rounded-xl flex items-center justify-center relative">
                  <div className="w-6 h-6 bg-white/30 rounded-full blur-md absolute top-2 right-2" />
                  <div className="w-4 h-4 bg-white/50 rounded-full blur-sm absolute bottom-3 left-3" />
                </div>
              }
              isPro={true}
            />
            <WallpaperStyleOption
              value="video"
              label="Video"
              isSelected={design.wallpaperStyle === "video"}
              onClick={() => {
                updateDesign("wallpaperStyle", "video");
              }}
              icon={
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                  </svg>
                </div>
              }
              isPro={true}
            />
          </div>
        </section>

        {/* Gradient Style (only show when gradient is selected) */}
        {design.wallpaperStyle === "gradient" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Gradient style</label>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => updateDesign("gradientStyle", "custom")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  design.gradientStyle === "custom"
                    ? "bg-white border-2 border-black"
                    : "bg-[#F1F0EE] border-2 border-transparent hover:bg-gray-200"
                }`}
              >
                Custom
              </button>
              <button
                type="button"
                onClick={() => updateDesign("gradientStyle", "premade")}
                className={`px-6 py-3 rounded-full font-medium transition-all relative ${
                  design.gradientStyle === "premade"
                    ? "bg-white border-2 border-black"
                    : "bg-[#F1F0EE] border-2 border-transparent hover:bg-gray-200"
                }`}
              >
                Pre-made
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                  ✓
                </span>
              </button>
            </div>
          </section>
        )}

        {/* Gradient Color (only show when gradient is selected and custom) */}
        {design.wallpaperStyle === "gradient" && design.gradientStyle === "custom" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Gradient color</label>

            <div className="relative">
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
                  type="text"
                  placeholder="#666666"
                  value={design.gradientColor || "#666666"}
                  onChange={(e) => handleColorChange(e.target.value, "gradient")}
                />

                <button
                  type="button"
                  onClick={() => setShowGradientColorPicker(!showGradientColorPicker)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                  style={{ backgroundColor: design.gradientColor || "#666666" }}
                />
              </div>

              {/* Color Picker Modal */}
              {showGradientColorPicker && (
                <>
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowGradientColorPicker(false)}
                  />
                  <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-3">Gradient color</label>

                      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                        <input
                          type="color"
                          value={design.gradientColor || "#666666"}
                          onChange={(e) => handleColorChange(e.target.value, "gradient")}
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
                              ${design.gradientColor || "#666666"} 0%, 
                              rgba(255,255,255,0.5) 100%)`,
                          }}
                        />
                      </div>

                      <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 cursor-pointer">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const hue = e.target.value;
                            const color = `hsl(${hue}, 70%, 50%)`;
                            handleColorChange(color, "gradient");
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

                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="text"
                          value={design.gradientColor || "#666666"}
                          onChange={(e) => handleColorChange(e.target.value, "gradient")}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                          placeholder="#666666"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Suggested</p>
                        <div className="flex gap-2">
                          {suggestedColors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => handleColorChange(color, "gradient")}
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
        )}

        {/* Gradient Direction (only show when gradient is selected and custom) */}
        {design.wallpaperStyle === "gradient" && design.gradientStyle === "custom" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Gradient direction</label>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => updateDesign("gradientDirection", "linear-up")}
                  className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center ${
                    design.gradientDirection === "linear-up"
                      ? "border-2 border-black bg-white"
                      : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
                <span className="mt-2 text-sm font-medium">Linear up</span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => updateDesign("gradientDirection", "linear-down")}
                  className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center ${
                    design.gradientDirection === "linear-down"
                      ? "border-2 border-black bg-white"
                      : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </button>
                <span className="mt-2 text-sm font-medium">Linear down</span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => updateDesign("gradientDirection", "radial")}
                  className={`w-full aspect-square rounded-2xl transition-all flex items-center justify-center relative ${
                    design.gradientDirection === "radial"
                      ? "border-2 border-black bg-white"
                      : "border-2 border-transparent bg-[#F1F0EE] hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                    ✓
                  </span>
                </button>
                <span className="mt-2 text-sm font-medium">Radial</span>
              </div>
            </div>
          </section>
        )}

        {/* Background Color (always show) */}
        <section>
          <label className="block text-sm font-semibold mb-4">
            {design.wallpaperStyle === "gradient" ? "Background color" : "Background color"}
          </label>

          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
                type="text"
                placeholder="#000000"
                value={design.backgroundColor || "#000000"}
                onChange={(e) => handleColorChange(e.target.value, "background")}
              />

              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
                style={{ backgroundColor: design.backgroundColor || "#000000" }}
              />
            </div>

            {/* Color Picker Modal */}
            {showColorPicker && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-3">Background color</label>

                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 cursor-crosshair">
                      <input
                        type="color"
                        value={design.backgroundColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value, "background")}
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
                            ${design.backgroundColor || "#000000"} 0%, 
                            rgba(255,255,255,0.5) 100%)`,
                        }}
                      />
                    </div>

                    <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 cursor-pointer">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const hue = e.target.value;
                          const color = `hsl(${hue}, 70%, 50%)`;
                          handleColorChange(color, "background");
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

                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={design.backgroundColor || "#000000"}
                        onChange={(e) => handleColorChange(e.target.value, "background")}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none uppercase"
                        placeholder="#000000"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Suggested</p>
                      <div className="flex gap-2">
                        {suggestedColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => handleColorChange(color, "background")}
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

        {/* Pattern (only show when pattern is selected) */}
        {design.wallpaperStyle === "pattern" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Pattern</label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <PatternOption
                value="grid"
                label="Grid"
                isSelected={design.pattern === "grid"}
                onClick={() => updateDesign("pattern", "grid")}
              />
              <PatternOption
                value="morph"
                label="Morph"
                isSelected={design.pattern === "morph"}
                onClick={() => updateDesign("pattern", "morph")}
              />
              <PatternOption
                value="organic"
                label="Organic"
                isSelected={design.pattern === "organic"}
                onClick={() => updateDesign("pattern", "organic")}
              />
              <PatternOption
                value="matrix"
                label="Matrix"
                isPro={true}
                isSelected={design.pattern === "matrix"}
                onClick={() => updateDesign("pattern", "matrix")}
              />
            </div>
          </section>
        )}

        {/* Background Image (only show when image is selected) */}
        {design.wallpaperStyle === "image" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Background image</label>

            <div className="flex flex-col gap-4">
              {design.backgroundImage && (
                <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img
                    src={design.backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <label className="flex-1 border-2 border-gray-300 px-5 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {design.backgroundImage ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                {design.backgroundImage && (
                  <button
                    type="button"
                    onClick={() => updateDesign("backgroundImage", null)}
                    className="border-2 border-red-300 px-5 py-2.5 bg-white text-red-600 rounded-full cursor-pointer font-medium hover:bg-red-50 transition-colors text-sm sm:text-base"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Effect (only show when image is selected) */}
        {design.wallpaperStyle === "image" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Effect</label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <EffectOption
                value="none"
                label="None"
                isSelected={design.imageEffect === "none"}
                onClick={() => updateDesign("imageEffect", "none")}
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                }
              />
              <EffectOption
                value="mono"
                label="Mono"
                isSelected={design.imageEffect === "mono"}
                onClick={() => updateDesign("imageEffect", "mono")}
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m0-6h6m-6 0H6" />
                  </svg>
                }
              />
              <EffectOption
                value="blur"
                label="Blur"
                isSelected={design.imageEffect === "blur"}
                onClick={() => updateDesign("imageEffect", "blur")}
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                }
              />
              <EffectOption
                value="halftone"
                label="Halftone"
                isSelected={design.imageEffect === "halftone"}
                onClick={() => updateDesign("imageEffect", "halftone")}
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="8" r="1" fill="currentColor" />
                    <circle cx="8" cy="16" r="1" fill="currentColor" />
                    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                  </svg>
                }
              />
            </div>
          </section>
        )}

        {/* Tint (only show when image is selected) */}
        {design.wallpaperStyle === "image" && (
          <section>
            <label className="block text-sm font-semibold mb-2">Tint</label>
            <p className="text-xs text-gray-600 mb-4">
              Improves text visibility and helps make your content more accessible
            </p>

            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>

              <input
                type="range"
                min="0"
                max="100"
                value={design.imageTint || 0}
                onChange={(e) => updateDesign("imageTint", parseInt(e.target.value))}
                className="flex-1"
              />

              <svg className="w-5 h-5 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>

              <span className="text-sm font-medium w-12 text-right">{design.imageTint || 0}%</span>
            </div>
          </section>
        )}

        {/* Background Video (only show when video is selected) */}
        {design.wallpaperStyle === "video" && (
          <section>
            <label className="block text-sm font-semibold mb-4">Background video</label>

            <div className="flex flex-col gap-4">
              {design.backgroundVideo && (
                <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
                  <video
                    src={design.backgroundVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <label className="flex-1 border-2 border-gray-300 px-5 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                  </svg>
                  {design.backgroundVideo ? "Change Video" : "Upload Video"}
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </label>

                {design.backgroundVideo && (
                  <button
                    type="button"
                    onClick={() => updateDesign("backgroundVideo", null)}
                    className="border-2 border-red-300 px-5 py-2.5 bg-white text-red-600 rounded-full cursor-pointer font-medium hover:bg-red-50 transition-colors text-sm sm:text-base"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Noise (show for all wallpaper styles) */}
        <section>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold mb-1">Noise</label>
              <p className="text-xs text-gray-600">Add a subtle grain texture</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={design.noise || false}
                onChange={(e) => updateDesign("noise", e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WallpaperSection;