import React from "react";

const themes = [
  { id: "custom", label: "Custom" },
  { id: "agate", label: "Agate" },
  { id: "air", label: "Air" },
  { id: "astrid", label: "Astrid" },
  { id: "aura", label: "Aura" },
  { id: "bliss", label: "Bliss" },
  { id: "blocks", label: "Blocks" },
];

const ThemeSection = ({ state, setState }) => {
  return (
    <div className="px-1">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Theme</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button className="pb-2 text-sm font-medium border-b-2 border-black">
          Customizable
        </button>
        <button className="pb-2 text-sm font-medium text-gray-500">
          Curated
        </button>
      </div>

      {/* Theme grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => setState((prev) => ({ ...prev, theme: theme.id }))}
            className={`rounded-2xl border bg-white cursor-pointer transition-all hover:shadow-sm
              ${
                state.theme === theme.id
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
          >
            {/* Preview box */}
            <div className="h-24 rounded-t-2xl bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium">
                Coming soon
              </span>
            </div>

            {/* Label */}
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-800">
                {theme.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSection;
