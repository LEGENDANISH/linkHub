import React from "react";

const WallpaperSection = ({ state, setState }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Wallpaper</h1>

      <div className="space-y-4">

        <select
          value={state.wallpaper || "fill"}
          onChange={(e) =>
            setState(prev => ({ ...prev, wallpaper: e.target.value }))
          }
        >
          <option value="fill">Fill</option>
          <option value="gradient">Gradient</option>
          <option value="blur">Blur</option>
          <option value="pattern">Pattern</option>
        </select>

        <input
          type="color"
          value={state.backgroundColor || "#7F2AEB"}
          onChange={(e) =>
            setState(prev => ({ ...prev, backgroundColor: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default WallpaperSection;
