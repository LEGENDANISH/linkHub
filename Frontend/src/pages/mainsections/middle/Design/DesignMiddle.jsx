
import React, { useEffect, useState } from "react";
import DesignSidebar from "./DesignSidebar";
import HeaderSection from "./sections/Headersection/HeaderSection";
import ThemeSection from "./sections/ThemeSection/ThemeSection";
import WallpaperSection from "./sections/WallpaperSection/WallpaperSection";
import TextSection from "./sections/TextSection/TextSection";
import ButtonsSection from "./sections/Buttonsection/ButtonsSection";
import ColorsSection from "./sections/ColorsSection";
import FooterSection from "./sections/FooterSection";
import { useDesign } from "./DesignSelectionManager";

// Tab metadata for the top pill nav (desktop fallback if DesignSidebar is hidden)
const TABS = [
  { key: "header",   label: "Header",   icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { key: "theme",    label: "Theme",    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { key: "wallpaper",label: "Wallpaper",icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "text",     label: "Text",     icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { key: "buttons",  label: "Buttons",  icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" },
  { key: "colors",   label: "Colors",   icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { key: "footer",   label: "Footer",   icon: "M4 6h16M4 12h16M4 18h7" },
];

const DesignMiddle = () => {
  const [activeTab, setActiveTab] = useState("header");
  const { design, updateDesign, updateDesignBatch } = useDesign();

  useEffect(() => {
    const draft = localStorage.getItem("designDraft");
    if (draft) updateDesignBatch(JSON.parse(draft));
  }, []);

  const sectionProps = { state: design, updateDesign, updateDesignBatch };

  const renderSection = () => {
    switch (activeTab) {
      case "header":    return <HeaderSection {...sectionProps} />;
      case "theme":     return <ThemeSection {...sectionProps} />;
      case "wallpaper": return <WallpaperSection />;
      case "text":      return <TextSection {...sectionProps} />;
      case "buttons":   return <ButtonsSection {...sectionProps} />;
      case "colors":    return <ColorsSection {...sectionProps} />;
      case "footer":    return <FooterSection {...sectionProps} />;
      default:          return null;
    }
  };

  const activeTabMeta = TABS.find(t => t.key === activeTab);

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: "transparent" }}>

      {/* ── STICKY HEADER ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 px-5 sm:px-7 pt-5 pb-4 shrink-0"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(147,51,234,0.08)",
        }}>
        <div className="flex items-center gap-3">
          {/* icon badge */}
          <div className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7c3aed,#a855f7)", boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }}>
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d={activeTabMeta?.icon} />
            </svg>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: "#18112e" }}>Design</h2>
            <p className="text-xs mt-0.5" style={{ color: "#a78bca" }}>
              Editing <span className="font-semibold" style={{ color: "#7c3aed" }}>{activeTabMeta?.label}</span>
            </p>
          </div>
        </div>

        {/* Mobile scrollable tab strip */}
        <div className="flex gap-1.5 mt-4 overflow-x-auto pb-0.5 sm:hidden scrollbar-none">
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95"
              style={{
                background: activeTab === key ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(124,58,237,0.07)",
                color: activeTab === key ? "#fff" : "#7c3aed",
                boxShadow: activeTab === key ? "0 3px 10px rgba(124,58,237,0.35)" : "none",
                border: activeTab === key ? "none" : "1px solid rgba(147,51,234,0.12)",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop sidebar */}
        <div className="hidden sm:flex flex-col shrink-0 overflow-y-auto"
          style={{ width: 200, borderRight: "1px solid rgba(147,51,234,0.08)", padding: "16px 10px", background: "rgba(255,255,255,0.6)" }}>

          {/* sidebar label */}
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-2" style={{ color: "#b89de8" }}>Sections</p>

          {TABS.map(({ key, label, icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium mb-1 text-left transition-all"
              style={{
                background: activeTab === key ? "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(168,85,247,0.07))" : "transparent",
                color: activeTab === key ? "#5b21b6" : "#57534e",
                boxShadow: activeTab === key ? "inset 0 0 0 1px rgba(147,51,234,0.18)" : "none",
                fontWeight: activeTab === key ? 600 : 500,
              }}
              onMouseEnter={e => { if (activeTab !== key) e.currentTarget.style.background = "rgba(124,58,237,0.04)"; }}
              onMouseLeave={e => { if (activeTab !== key) e.currentTarget.style.background = "transparent"; }}>
              <div className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: 28, height: 28, background: activeTab === key ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(0,0,0,0.04)", boxShadow: activeTab === key ? "0 2px 8px rgba(124,58,237,0.3)" : "none", transition: "all 0.18s" }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke={activeTab === key ? "#fff" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={icon} />
                </svg>
              </div>
              {label}
              {activeTab === key && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", boxShadow: "0 0 6px rgba(124,58,237,0.5)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          {/* section card wrapper */}
          <div className="max-w-2xl">
            {renderSection()}
          </div>
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default DesignMiddle;