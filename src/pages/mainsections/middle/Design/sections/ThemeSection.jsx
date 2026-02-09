import React from "react";

const ThemeSection = ({ state, updateDesign }) => {
  // Curated themes with distinctive aesthetics
  const customizableThemes = [
    {
      id: "custom",
      label: "Custom",
      preview: "gradient",
      colors: { primary: "#000000", secondary: "#ffffff" },
    },
    {
      id: "agate",
      label: "Agate",
      preview: "gradient",
      colors: { primary: "#D4A574", secondary: "#8B4513" },
    },
    {
      id: "air",
      label: "Air",
      preview: "gradient",
      colors: { primary: "#E0F2FE", secondary: "#0EA5E9" },
    },
    {
      id: "astrid",
      label: "Astrid",
      preview: "gradient",
      colors: { primary: "#FDF4FF", secondary: "#C084FC" },
    },
    {
      id: "aura",
      label: "Aura",
      preview: "gradient",
      colors: { primary: "#1E1B4B", secondary: "#818CF8" },
    },
    {
      id: "bliss",
      label: "Bliss",
      preview: "gradient",
      colors: { primary: "#FEF3C7", secondary: "#F59E0B" },
    },
    {
      id: "blocks",
      label: "Blocks",
      preview: "pattern",
      colors: { primary: "#FF6B6B", secondary: "#4ECDC4" },
    },
    {
      id: "candy",
      label: "Candy",
      preview: "gradient",
      colors: { primary: "#FBBF24", secondary: "#EC4899" },
    },
  ];

  const curatedThemes = [
    {
      id: "midnight",
      label: "Midnight",
      preview: "gradient",
      colors: { primary: "#0F172A", secondary: "#334155" },
      isPro: true,
    },
    {
      id: "sunset",
      label: "Sunset",
      preview: "gradient",
      colors: { primary: "#FF6B6B", secondary: "#FFE66D" },
      isPro: true,
    },
    {
      id: "ocean",
      label: "Ocean",
      preview: "gradient",
      colors: { primary: "#0077BE", secondary: "#00C9A7" },
      isPro: true,
    },
    {
      id: "forest",
      label: "Forest",
      preview: "gradient",
      colors: { primary: "#1B4332", secondary: "#52B788" },
      isPro: true,
    },
    {
      id: "lavender",
      label: "Lavender",
      preview: "gradient",
      colors: { primary: "#E0B0FF", secondary: "#DDA0DD" },
      isPro: true,
    },
    {
      id: "cosmic",
      label: "Cosmic",
      preview: "gradient",
      colors: { primary: "#2E1065", secondary: "#A78BFA" },
      isPro: true,
    },
    {
      id: "cherry",
      label: "Cherry",
      preview: "gradient",
      colors: { primary: "#BE123C", secondary: "#FB7185" },
      isPro: true,
    },
    {
      id: "mint",
      label: "Mint",
      preview: "gradient",
      colors: { primary: "#10B981", secondary: "#D1FAE5" },
      isPro: true,
    },
  ];

  const [activeTab, setActiveTab] = React.useState("customizable");

  const applyTheme = (theme) => {
    updateDesign("theme", theme.id);
    updateDesign("backgroundColor", theme.colors.primary);
    updateDesign("buttonColor", theme.colors.secondary);
    
    // Apply theme-specific settings
    if (theme.preview === "gradient") {
      updateDesign("wallpaperStyle", "gradient");
      updateDesign("gradientColor", theme.colors.secondary);
      updateDesign("gradientDirection", "linear-down");
    } else if (theme.preview === "pattern") {
      updateDesign("wallpaperStyle", "pattern");
      updateDesign("pattern", "grid");
    }
  };

  const ThemeCard = ({ theme, isSelected }) => (
    <div
      onClick={() => applyTheme(theme)}
      className={`rounded-2xl border-2 bg-white cursor-pointer transition-all hover:shadow-lg relative overflow-hidden ${
        isSelected
          ? "border-black ring-2 ring-black"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Preview */}
      <div className="h-32 relative overflow-hidden">
        {theme.preview === "gradient" ? (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            }}
          >
            {/* Mock profile and buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50" />
              <div className="w-full max-w-[80%] space-y-1.5">
                <div className="h-6 bg-white/30 backdrop-blur-sm rounded-full border border-white/50" />
                <div className="h-6 bg-white/30 backdrop-blur-sm rounded-full border border-white/50" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {/* Pattern preview */}
            <div className="absolute inset-0 grid grid-cols-6 gap-1 p-2 opacity-30">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
              <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm" />
              <div className="w-full max-w-[80%] space-y-1.5">
                <div className="h-6 bg-white/40 backdrop-blur-sm rounded-full" />
                <div className="h-6 bg-white/40 backdrop-blur-sm rounded-full" />
              </div>
            </div>
          </div>
        )}

        {theme.isPro && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-800/80 backdrop-blur-sm text-white text-xs flex items-center justify-center">
            ✓
          </span>
        )}
      </div>

      {/* Label */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-800">{theme.label}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Theme</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("customizable")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "customizable"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Customizable
        </button>
        <button
          onClick={() => setActiveTab("curated")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "curated"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Curated
        </button>
      </div>

      {/* Theme grid */}
      {activeTab === "customizable" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {customizableThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={state.theme === theme.id}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {curatedThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={state.theme === theme.id}
            />
          ))}
        </div>
      )}

      {/* Info message for curated themes */}
      {activeTab === "curated" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <div>
              <p className="text-sm font-medium text-purple-900 mb-1">
                Premium Curated Themes
              </p>
              <p className="text-xs text-purple-700">
                These professionally designed themes are carefully crafted to provide stunning aesthetics with optimal color harmony and visual balance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSection;  