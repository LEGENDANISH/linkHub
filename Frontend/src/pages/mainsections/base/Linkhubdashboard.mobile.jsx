// ─── LinkhubDashboard.mobile.jsx ──────────────────────────────────────────────
// Contains: MobileDashboard — the full mobile branch of LinkhubDashboard

import React from "react";
import { X, User } from "lucide-react";
import Middle from "../middle/links/linksMiddle";
import MobilePreview from "../../RightSide/MobilePreview";
import MobileProfileDropdown from "../components/MobileProfileDropdown";
import { NavItem, DesignNavButton, renderDesignPanelContent } from "./LinkhubDashboard.constants";

export default function MobileDashboard({
  // section state
  activeSection,
  setActiveSection,
  // design panel state
  activeDesignPanel,
  setActiveDesignPanel,
  activeStyleTab,
  setActiveStyleTab,
  // preview / profile
  showPreview,
  setShowPreview,
  showProfile,
  setShowProfile,
  // design store slices
  design,
  updateDesign,
  updateDesignBatch,
}) {
  const handleDesignPanelOpen = (panel) => setActiveDesignPanel(panel);

  const handleDesignPanelClose = () => {
    setActiveDesignPanel(null);
    setActiveStyleTab("text");
  };

  return (
    <div className="h-screen w-full bg-[#f6f7fb] flex flex-col overflow-hidden">
      {/* ── MOBILE HEADER ─────────────────────────────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm z-20">
        <button
          onClick={() => setShowProfile(true)}
          className="p-1 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </button>

        <h1 className="font-semibold text-gray-900 text-lg tracking-tight">
          {activeSection === "links" ? "Links" : "Design"}
        </h1>

        <button
          onClick={() => {
            console.log("Settings button clicked!");
          }}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>

      {/* ── CONTENT AREA ──────────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        {activeSection === "links" ? (
          <>
            {/* Background preview (non-scrolling) */}
            <div className="absolute inset-0 z-0">
              <MobilePreview activeSection={activeSection} />
            </div>

            {/* Scrollable editor panel */}
            <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-xl overflow-y-auto">
              <Middle />
            </div>
          </>
        ) : (
          <>
            {/* MobilePreview Background */}
            <div
              className={`absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 transition-all duration-500 ease-in-out ${
                activeDesignPanel
                  ? "scale-[0.85] -translate-y-12 opacity-50"
                  : "scale-[1.4]"
              }`}
            >
              <div className="origin-center">
                <MobilePreview activeSection={activeSection} />
              </div>
            </div>

            {/* Design Navigation Buttons */}
            <div
              className={`absolute inset-x-0 bottom-24 z-20 px-6 transition-all duration-300 ${
                activeDesignPanel
                  ? "opacity-0 pointer-events-none translate-y-4"
                  : "opacity-100"
              }`}
            >
              <div className="flex justify-center gap-3">
                <DesignNavButton
                  label="Theme"
                  onClick={() => handleDesignPanelOpen("theme")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  }
                />
                <DesignNavButton
                  label="Header"
                  onClick={() => handleDesignPanelOpen("header")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />
                <DesignNavButton
                  label="Wallpaper"
                  onClick={() => handleDesignPanelOpen("wallpaper")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <DesignNavButton
                  label="Style"
                  onClick={() => handleDesignPanelOpen("style")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Slide-up Design Panel */}
            <div
              className={`absolute inset-x-0 bottom-0 z-30 bg-white rounded-t-3xl shadow-2xl transition-all duration-500 ease-out ${
                activeDesignPanel ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ height: "75vh" }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <button
                  onClick={handleDesignPanelClose}
                  className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {activeDesignPanel === "style" ? "Style" : activeDesignPanel}
                </h2>

                <button
                  onClick={handleDesignPanelClose}
                  className="p-2 -mr-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Panel Content */}
              <div className="h-[calc(75vh-73px)] overflow-y-auto px-6 py-4">
                {renderDesignPanelContent({
                  activeDesignPanel,
                  activeStyleTab,
                  setActiveStyleTab,
                  design,
                  updateDesign,
                  updateDesignBatch,
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── FLOATING BOTTOM NAV ───────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2 z-40">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 flex justify-around px-3 py-3">
          <NavItem
            label="Links"
            active={activeSection === "links"}
            onClick={() => {
              setActiveSection("links");
              setActiveDesignPanel(null);
            }}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            }
          />

          <NavItem
            label="Design"
            active={activeSection === "design"}
            onClick={() => {
              setActiveSection("design");
              setActiveDesignPanel(null);
            }}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            }
          />

          <NavItem
            label="Preview"
            active={false}
            onClick={() => setShowPreview(true)}
            icon={
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </>
            }
          />
        </div>
      </div>

      {/* ── PREVIEW MODAL ─────────────────────────────────────────────────── */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 max-w-sm w-full">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center justify-center">
              <MobilePreview activeSection={activeSection} />
            </div>
          </div>
        </div>
      )}

      {/* ── PROFILE DROPDOWN ──────────────────────────────────────────────── */}
      <MobileProfileDropdown open={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}