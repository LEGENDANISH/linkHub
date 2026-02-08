import React from "react";

const ColorsSection = ({ state, updateDesign }) => {
  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-semibold mb-8">Colors</h1>

      <div className="space-y-8">
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

        {/* Accent Color */}
        <section>
          <p className="text-sm font-semibold mb-4">Accent color</p>

          <div className="flex items-center gap-3">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black bg-white"
              type="text"
              value={state.accentColor || "#000000"}
              onChange={(e) => updateDesign("accentColor", e.target.value)}
            />

            <input
              type="color"
              className="w-12 h-12 rounded-lg border cursor-pointer"
              value={state.accentColor || "#000000"}
              onChange={(e) => updateDesign("accentColor", e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorsSection;