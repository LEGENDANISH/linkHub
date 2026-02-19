import React, { useState, useEffect } from "react";
import ProfileDropdown from "./components/ProfileDropdown";
import Middle from "./middle/links/linksMiddle";
import DesignMiddle from "./middle/Design/DesignMiddle";
import MobilePreview from "../RightSide/MobilePreview";
import ThemeSection from "./middle/Design/sections/ThemeSection/ThemeSection";
import HeaderSection from "./middle/Design/sections/Headersection/HeaderSection";
import WallpaperSection from "./middle/Design/sections/WallpaperSection/WallpaperSection";
import ColorsSection from "./middle/Design/sections/ColorsSection";
import ButtonsSection from "./middle/Design/sections/Buttonsection/ButtonsSection";
import TextSection from "./middle/Design/sections/TextSection/TextSection";
import { X, User, ArrowLeftRight, Plus, UserCircle, Zap, HelpCircle, BookOpen, MessageSquare, LogOut } from "lucide-react";
import SettingsDropdown from "./components/SettingsDropdown";

import axios from "axios";
// AFTER
import { useDesign, rehydrateDesignForUser } from "./middle/Design/DesignSelectionManager";
import { useSelection, rehydrateLinksForUser } from "./middle/links/Selectionmanager";
const DEFAULT_DESIGN = {
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
export default function LinkhubDashboard() {
  
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("links");
  const [isMobile, setIsMobile] = useState(false);
  const [activeDesignPanel, setActiveDesignPanel] = useState(null);
  const [activeStyleTab, setActiveStyleTab] = useState("text");
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);


const getActiveLinks = useSelection((state) => state.getActiveLinks);
const token = localStorage.getItem("accessToken");
  // Use Zustand store instead of local state
const design = useDesign((state) => state.design);
const updateDesign = useDesign((state) => state.updateDesign);
const updateDesignBatch = useDesign((state) => state.updateDesignBatch);


// replace this entire block in base.jsx

useEffect(() => {
  const initBuilder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const userId = user.id;
      const accessToken = localStorage.getItem("accessToken");

      // wait for zustand hydration
      const currentLinks = useSelection.getState().links;

      // if links already exist → skip backend
      if (currentLinks && currentLinks.length > 0) {
        console.log("Using local links");
        return;
      }

      console.log("Fetching links from backend");

      const [profileRes, linksRes] = await Promise.all([
        fetch("http://localhost:5000/api/profile/me/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:5000/api/links", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const profileData = await profileRes.json();
      const linksData = await linksRes.json();

      if (profileData.success && profileData.data) {
        const { links, _count, user: u, ...designOnly } = profileData.data;

       const normalizeDesign = (d) => ({
  ...d,

  profileLayout: d.profileLayout?.toLowerCase(),
  wallpaperStyle: d.wallpaperStyle?.toLowerCase(),
  profileSize: d.profileSize?.toLowerCase(),
  titleAlignment: d.titleAlignment?.toLowerCase(),

  // ✅ KEEP ENUMS ORIGINAL
  titleType: d.titleType,
});


        updateDesignBatch(normalizeDesign(designOnly));
      }

    const linksArray = Array.isArray(linksData.links)
  ? linksData.links
  : [];


      useSelection.getState().syncLinks(linksArray);

    } catch (err) {
      console.error("initBuilder failed:", err);
    }
  };

  initBuilder();
}, []);



console.log(design.profileLayout);

const MAX_LINKS = 5;

const handleSaveAll = async () => {
  console.log(design);

  try {
    // ---- PROFILE SAVE (same logic) ----
    const profilePayload = {
      ...design,

      titleType: design.titleType
        ? design.titleType.toUpperCase()
        : design.titleType,

      profileSize: design.profileSize
        ? design.profileSize.toUpperCase()
        : design.profileSize,

      id: undefined,
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      viewCount: undefined,
    };

    await axios.put(
      "http://localhost:5000/api/profile/update",
      profilePayload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ---- LINKS SAVE (same loop logic) ----

    const activeLinks = (getActiveLinks() || []).slice(0, MAX_LINKS); // cap at 5

    // Step 1: wipe all existing links for this user
    await axios.delete("http://localhost:5000/api/links/all", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Step 2: re-create all links fresh (always POST)
    for (const link of activeLinks) {
      const linkPayload = {
        ...link,
        title: link.name,
        url: link.url?.startsWith("http") ? link.url : `https://${link.url}`,
        id: undefined,
        clicks: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };

      await axios.post("http://localhost:5000/api/links", linkPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    alert("Saved successfully");
  } catch (err) {
    console.error(err);
    alert("Save failed");
  }
};



  // Detect mobile screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Debug: Log design changes
  useEffect(() => {
    console.log('🎨 Design state changed:', design);
  }, [design]);

  // Debug: Log settings state
  useEffect(() => {
    console.log('⚙️ Settings open:', showSettings);
  }, [showSettings]);

  const NavItem = ({ label, icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active ? "bg-purple-100 text-purple-600" : "bg-white text-gray-500 hover:bg-gray-50"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        active ? "bg-purple-600" : "bg-gray-100"
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${active ? "text-white" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  const DesignNavButton = ({ label, icon, onClick }) => (
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

  const handleDesignPanelOpen = (panel) => {
    setActiveDesignPanel(panel);
  };

  const handleDesignPanelClose = () => {
    setActiveDesignPanel(null);
    setActiveStyleTab("text");
  };

  // Render the appropriate design panel content
  const renderDesignPanelContent = () => {
    const sectionProps = {
      state: design,
      updateDesign,
      updateDesignBatch,
    };

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
              <button
                onClick={() => setActiveStyleTab("text")}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeStyleTab === "text"
                    ? "text-gray-900 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setActiveStyleTab("buttons")}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeStyleTab === "buttons"
                    ? "text-gray-900 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Buttons
              </button>
              <button
                onClick={() => setActiveStyleTab("colors")}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeStyleTab === "colors"
                    ? "text-gray-900 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Colors
              </button>
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

  // MOBILE APP EXPERIENCE
  if (isMobile) {
    return (
      <div className="h-screen w-full bg-[#f6f7fb] flex flex-col overflow-hidden">
        {/* ---------- MOBILE HEADER ---------- */}
        <div className="bg-white/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm z-20">
          <button
            onClick={() => setActiveSection("links")}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="font-semibold text-gray-900 text-lg tracking-tight">
            {activeSection === "links" ? "Links" : "Design"}
          </h1>

          <button 
            onClick={() => {
              console.log('Settings button clicked!');
              setShowSettings(true);
            }}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* ---------- CONTENT AREA ---------- */}
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
              {/* MobilePreview Background - scales down when panel is open */}
              <div 
                className={`absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 transition-all duration-500 ease-in-out ${
                  activeDesignPanel 
                    ? 'scale-[0.85] -translate-y-12 opacity-50' 
                    : 'scale-[1.4]'
                }`}
              >
                <div className="origin-center">
                  <MobilePreview activeSection={activeSection} />
                </div>
              </div>

              {/* Design Navigation Buttons - hide when panel is open */}
              <div 
                className={`absolute inset-x-0 bottom-24 z-20 px-6 transition-all duration-300 ${
                  activeDesignPanel ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
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
                  activeDesignPanel 
                    ? 'translate-y-0' 
                    : 'translate-y-full'
                }`}
                style={{ height: '75vh' }}
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
                  {renderDesignPanelContent()}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ---------- FLOATING BOTTOM NAV ---------- */}
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

           <NavItem
  label="Enhance"
  active={false}
  onClick={() => setShowSettings(true)}  // Changed from {} to setShowSettings(true)
  icon={
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  }
/>
          </div>
        </div>

        {/* ---------- PREVIEW MODAL ---------- */}
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

        {/* ---------- SETTINGS DROPDOWN ---------- */}
       {/* ---------- SETTINGS DROPDOWN ---------- */}
{showSettings && <SettingsDropdown onClose={() => setShowSettings(false)} />}
      </div>
    );
  }

  // Desktop layout (rest of the code stays the same...)
  return (
    <div className="w-full h-screen bg-[#f5f6f8] flex overflow-hidden">
      {/* ... rest of desktop code ... */}
      <aside className="w-64 bg-white border-r border-gray-200 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <ProfileDropdown />

         
        </div>

        <nav className="space-y-4">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-md px-2 py-1 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm136-24a8,8,0,0,1-8,8H184v24a8,8,0,0,1-16,0V184H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v24h24A8,8,0,0,1,216,176Z" />
              </svg>
              <span className="font-medium text-gray-800">My LinkHub</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {open && (
            <div className="ml-8 space-y-1">
              <div
                onClick={() => setActiveSection("links")}
                className={`px-3 py-2 rounded-lg font-medium text-sm cursor-pointer ${
                  activeSection === "links"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Links
              </div>
              <div
                onClick={() => setActiveSection("design")}
                className={`px-3 py-2 rounded-lg font-medium text-sm cursor-pointer ${
                  activeSection === "design"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Design
              </div>
            </div>
          )}

         
        </nav>

    
      </aside>

      <main className="flex-1 overflow-auto">
        {activeSection === "links" && <Middle />}
        {activeSection === "design" && <DesignMiddle />}
      </main>

      {!isMobile && (
  <div className="flex">
    <button
      onClick={handleSaveAll}
      className="absolute top-4 right-4 z-30 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-purple-700 transition font-medium"
    >
      Save
    </button>

    <MobilePreview activeSection={activeSection} />
  </div>
)}
    </div>
  );
}