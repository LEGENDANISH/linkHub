import React, { useState, useEffect } from "react";
import ProfileDropdown from "./components/ProfileDropdown";
import Middle from "./middle/links/linksMiddle";
import DesignMiddle from "./middle/Design/DesignMiddle";
import MobilePreview from "../RightSide/MobilePreview";
import DesignDebugger from "./middle/Design/Designdebugger";

export default function LinktreeDashboard() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("links");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition ${
      active ? "text-purple-600" : "text-gray-500"
    }`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icon}
    </svg>
    <span className="text-[11px] font-medium">{label}</span>
  </button>
);

  // On mobile: always show MobilePreview as main view
 // MOBILE APP EXPERIENCE
if (isMobile) {
  return (
    <div className="h-screen w-full bg-[#f6f7fb] flex flex-col overflow-hidden">

      {/* ---------- MOBILE HEADER ---------- */}
      <div className="bg-white/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="font-semibold text-gray-900 text-lg tracking-tight">
          {activeSection === "links" ? "Links" : "Design"}
        </h1>

        <div className="w-8" />
      </div>


      {/* ---------- PREVIEW AREA ---------- */}
      <div className="flex-1 relative overflow-hidden">

        {/* Mobile preview always behind */}
        <div className="absolute inset-0 z-0">
          <MobilePreview activeSection={activeSection} />
        </div>

        {/* Editor panel floating above preview */}
        <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-xl">
          {activeSection === "links" && <Middle />}
          {activeSection === "design" && <DesignMiddle />}
        </div>

      </div>


      {/* ---------- BOTTOM NAV (APP STYLE) ---------- */}
      <div className="bg-white/90 backdrop-blur-xl border-t px-2 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around">

          <NavItem
            label="Links"
            active={activeSection === "links"}
            onClick={() => setActiveSection("links")}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 11.828a4 4 0 015.656 0l7 7a4 4 0 010 5.656l-7 7a4 4 0 01-5.656-5.656L15.656 12L13.828 10.172a4 4 0 010-5.656z" />
            }
          />

          <NavItem
            label="Design"
            active={activeSection === "design"}
            onClick={() => setActiveSection("design")}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            }
          />

          <NavItem
            label="Preview"
            active={false}
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
            icon={
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </>
            }
          />

        </div>
      </div>
    </div>
  );
}


  // Desktop layout (unchanged, but we’ll clean up extra comments)
  return (
    <div className="w-full h-screen bg-[#f5f6f8] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <ProfileDropdown />

          <div className="cursor-pointer">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
              />
            </svg>
          </div>
        </div>

        <nav className="space-y-4">
          {/* Dropdown header */}
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

          {/* Dropdown items */}
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

          <p className="text-gray-400 text-sm uppercase mt-6">Tools</p>
          <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            Social planner
          </div>
          <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            Instagram auto-reply
          </div>
        </nav>

        <div className="mt-10 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Your setup checklist</p>
          <p className="font-semibold mt-1">1 of 6 complete</p>
          <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg">
            Finish setup
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeSection === "links" && <Middle />}
        {activeSection === "design" && <DesignMiddle />}
      </main>

      {/* Mobile Preview (desktop only) */}
      {!isMobile && <MobilePreview activeSection={activeSection} />}
    </div>
  );
}