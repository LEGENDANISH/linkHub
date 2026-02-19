// ─── LinkhubDashboard.constants.jsx ───────────────────────────────────────────
// Contains: DEFAULT_DESIGN, NavItem, DesignNavButton, renderDesignPanelContent

import React from "react";
import ThemeSection from "../middle/Design/sections/ThemeSection/ThemeSection";
import HeaderSection from "../middle/Design/sections/Headersection/HeaderSection";
import WallpaperSection from "../middle/Design/sections/WallpaperSection/WallpaperSection";
import ColorsSection from "../middle/Design/sections/ColorsSection";
import ButtonsSection from "../middle/Design/sections/Buttonsection/ButtonsSection";
import TextSection from "../middle/Design/sections/TextSection/TextSection";

// ── Default design state ──────────────────────────────────────────────────────
export const DEFAULT_DESIGN = {
  wallpaperStyle: "SOLID",
  backgroundColor: "#ffffff",
  profileLayout: "CLASSIC",
  profileSize: "MEDIUM",
  profileShape: "circle",
  titleType: "TEXT",
  titleText: null,
  titleColor: "#000000",
  titleFontSize: "24px",
  titleFontWeight: "bold",
  titleAlignment: "center",
  blurEffect: false,
  blurIntensity: 10,
  noiseEffect: false,
  footerVisible: true,
  footerText: "",
};

// ── Shared bottom-nav item (mobile) ──────────────────────────────────────────
export const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
      active ? "bg-purple-100 text-purple-600" : "bg-white text-gray-500 hover:bg-gray-50"
    }`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        active ? "bg-purpl  e-600" : "bg-gray-100"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${active ? "text-white" : "text-gray-600"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icon}
      </svg>
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

// ── Design panel quick-launch button (mobile) ─────────────────────────────────
export const DesignNavButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/50 hover:bg-white transition-all min-w-[70px]"
  >
    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-[11px] font-medium text-gray-700">{label}</span>
  </button>
);

// ── Renders the slide-up design panel content based on activeDesignPanel ──────
export const renderDesignPanelContent = ({
  activeDesignPanel,
  activeStyleTab,
  setActiveStyleTab,
  design,
  updateDesign,
  updateDesignBatch,
}) => {
  const sectionProps = { state: design, updateDesign, updateDesignBatch };

  switch (activeDesignPanel) {
    case "theme":
      return <ThemeSection {...sectionProps} />;
    case "header":
      return <HeaderSection {...sectionProps} />;
    case "wallpaper":
      return <WallpaperSection />;
    case "style":
      return (
        <div className="flex flex-col h-full">
          {/* Style Tabs */}
          <div className="flex gap-0 border-b border-gray-200 mb-4">
            {["text", "buttons", "colors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStyleTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeStyleTab === tab
                    ? "text-gray-900 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeStyleTab === "text" && <TextSection {...sectionProps} />}
            {activeStyleTab === "buttons" && <ButtonsSection {...sectionProps} />}
            {activeStyleTab === "colors" && <ColorsSection {...sectionProps} />}
          </div>
        </div>
      );
    default:
      return null;
  }
};