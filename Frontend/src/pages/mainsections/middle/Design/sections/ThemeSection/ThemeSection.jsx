import React from "react";
import { customizableThemes, videoThemes, advancedThemes } from "./themeData";
import ThemeCard from "./ThemeCard";
import { VideoInfoBanner, AdvancedInfoBanner } from "./InfoBanners";

const ThemeSection = ({ state, updateDesign }) => {
  const [activeTab, setActiveTab] = React.useState("customizable");

  const applyTheme = (theme) => {
    console.log("🎨 Applying theme:", theme.id, theme.settings);
    
    // Apply all theme settings
    Object.entries(theme.settings).forEach(([key, value]) => {
      updateDesign(key, value);
    });
    
    // Set theme ID
    updateDesign("theme", theme.id);
  };

  return (
    <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Themes</h1>

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
          onClick={() => setActiveTab("video")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "video"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Video Backgrounds
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "advanced"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Theme grid */}
      {activeTab === "customizable" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {customizableThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={state.theme === theme.id}
              onApply={applyTheme}
            />
          ))}
        </div>
      )}

      {activeTab === "video" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {videoThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={state.theme === theme.id}
                onApply={applyTheme}
              />
            ))}
          </div>
          <VideoInfoBanner />
        </>
      )}

      {activeTab === "advanced" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {advancedThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={state.theme === theme.id}
                onApply={applyTheme}
              />
            ))}
          </div>
          <AdvancedInfoBanner />
        </>
      )}
    </div>
  );
};

export default ThemeSection;