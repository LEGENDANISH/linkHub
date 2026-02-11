import React, { useState, useEffect } from "react";
import { useDesign } from "../../DesignSelectionManager";
import ColorPicker from "./Colorpicker";
import WallpaperStyleOption from "./WallpaperstyleOption";
import PatternOption from "./Patternoption";
import GradientControls from "./Gradientcontrols";
import ImageControls from "./Imagecontrols";
import VideoControls from "./Videocontrols";

const WallpaperSection = () => {
  const { design, updateDesign } = useDesign();
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Initialize default values when component mounts or wallpaper style changes
  useEffect(() => {
    if (!design.wallpaperStyle) {
      updateDesign("wallpaperStyle", "fill");
    }

    if (!design.backgroundColor) {
      updateDesign("backgroundColor", "#000000");
    }

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

    if (design.wallpaperStyle === "pattern" && !design.pattern) {
      updateDesign("pattern", "grid");
    }

    if (design.wallpaperStyle === "image" && !design.imageEffect) {
      updateDesign("imageEffect", "none");
    }

    if (design.noise === undefined) {
      updateDesign("noise", false);
    }

    if (design.imageTint === undefined) {
      updateDesign("imageTint", 0);
    }
  }, [design.wallpaperStyle]);

  const suggestedColors = ["#000000", "#1a1a1a", "#7F2AEB", "#FF6B6B"];

  const handleColorChange = (color) => {
    updateDesign("backgroundColor", color);
  };

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
              onClick={() => updateDesign("wallpaperStyle", "fill")}
              icon={<div className="w-16 h-16 bg-black rounded-xl" />}
            />
            <WallpaperStyleOption
              value="gradient"
              label="Gradient"
              isSelected={design.wallpaperStyle === "gradient"}
              onClick={() => {
                updateDesign("wallpaperStyle", "gradient");
                setTimeout(() => {
                  if (!design.gradientStyle) updateDesign("gradientStyle", "custom");
                  if (!design.gradientDirection) updateDesign("gradientDirection", "linear-down");
                  if (!design.gradientColor) updateDesign("gradientColor", "#666666");
                }, 0);
              }}
              icon={<div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-400 rounded-xl" />}
            />
            <WallpaperStyleOption
              value="blur"
              label="Blur"
              isSelected={design.wallpaperStyle === "blur"}
              onClick={() => updateDesign("wallpaperStyle", "blur")}
              icon={<div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 rounded-xl blur-sm" />}
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
              onClick={() => updateDesign("wallpaperStyle", "video")}
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

        {/* Gradient Controls */}
        {design.wallpaperStyle === "gradient" && (
          <GradientControls design={design} updateDesign={updateDesign} />
        )}

        {/* Background Color */}
        <section>
          <label className="block text-sm font-semibold mb-4">Background color</label>
          <div className="flex items-center gap-3">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-black focus:outline-none bg-white uppercase"
              type="text"
              placeholder="#000000"
              value={design.backgroundColor || "#000000"}
              onChange={(e) => handleColorChange(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowColorPicker(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0"
              style={{ backgroundColor: design.backgroundColor || "#000000" }}
            />
          </div>

          <ColorPicker
            show={showColorPicker}
            onClose={() => setShowColorPicker(false)}
            value={design.backgroundColor || "#000000"}
            onChange={handleColorChange}
            label="Background color"
            suggestedColors={suggestedColors}
          />
        </section>

        {/* Pattern */}
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

        {/* Image Controls */}
        {design.wallpaperStyle === "image" && (
          <ImageControls design={design} updateDesign={updateDesign} />
        )}

        {/* Video Controls */}
        {design.wallpaperStyle === "video" && (
          <VideoControls design={design} updateDesign={updateDesign} />
        )}

        {/* Noise */}
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