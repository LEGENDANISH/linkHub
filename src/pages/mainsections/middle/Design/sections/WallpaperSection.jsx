import React from "react";

const WallpaperSection = ({ state, updateDesign }) => {
  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-semibold mb-8">Wallpaper</h1>

      <div className="space-y-8">
        {/* Wallpaper Type */}
        <section>
          <p className="text-sm font-semibold mb-4">Wallpaper type</p>

          <select
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none bg-white"
            value={state.wallpaper || "fill"}
            onChange={(e) => updateDesign("wallpaper", e.target.value)}
          >
            <option value="fill">Fill</option>
            <option value="gradient">Gradient</option>
            <option value="blur">Blur</option>
            <option value="pattern">Pattern</option>
          </select>
        </section>

        {/* Background Color */}
        <section>
          <p className="text-sm font-semibold mb-4">Background color</p>

          <div className="flex items-center gap-3">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black bg-white"
              type="text"
              value={state.backgroundColor || "#7F2AEB"}
              onChange={(e) => updateDesign("backgroundColor", e.target.value)}
            />

            <input
              type="color"
              className="w-12 h-12 rounded-lg border cursor-pointer"
              value={state.backgroundColor || "#7F2AEB"}
              onChange={(e) => updateDesign("backgroundColor", e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WallpaperSection;