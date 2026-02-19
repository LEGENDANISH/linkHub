import React, { useState, useEffect } from "react";
import ProfileDropdown from "../components/ProfileDropdown";
import Middle from "../middle/links/linksMiddle";
import DesignMiddle from "../middle/Design/DesignMiddle";
import MobilePreview from "../../RightSide/MobilePreview";

import { X, User, ArrowLeftRight, Plus, UserCircle, Zap, HelpCircle, BookOpen, MessageSquare, LogOut,ExternalLink  } from "lucide-react";




import axios from "axios";
// AFTER
import { useDesign, rehydrateDesignForUser } from "../middle/Design/DesignSelectionManager";
import { useSelection, rehydrateLinksForUser } from "../middle/links/Selectionmanager";
import { useNavigate } from "react-router-dom";

export default function LinkhubDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("links");
  const [isMobile, setIsMobile] = useState(false);
  const [activeDesignPanel, setActiveDesignPanel] = useState(null);
  const [activeStyleTab, setActiveStyleTab] = useState("text");
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getActiveLinks = useSelection((state) => state.getActiveLinks);
  const token = localStorage.getItem("accessToken");

  const design = useDesign((state) => state.design);
  const updateDesign = useDesign((state) => state.updateDesign);
  const updateDesignBatch = useDesign((state) => state.updateDesignBatch);

  const navigate = useNavigate();

  // ── Init: load profile + links from backend if local state is empty ─────────
  useEffect(() => {
    const initBuilder = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const accessToken = localStorage.getItem("accessToken");
        const currentLinks = useSelection.getState().links;

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
          localStorage.setItem("profileSlug", profileData.data.slug);

          const normalizeDesign = (d) => ({
            ...d,
            profileLayout: d.profileLayout?.toLowerCase(),
            wallpaperStyle: d.wallpaperStyle?.toLowerCase(),
            profileSize: d.profileSize?.toLowerCase(),
            titleAlignment: d.titleAlignment?.toLowerCase(),
            titleType: d.titleType, // keep enum original
          });

          updateDesignBatch(normalizeDesign(designOnly));
        }

        const linksArray = Array.isArray(linksData.links) ? linksData.links : [];
        useSelection.getState().syncLinks(linksArray);
      } catch (err) {
        console.error("initBuilder failed:", err);
      }
    };

    initBuilder();
  }, []);

  // ── Debug logs ───────────────────────────────────────────────────────────────
  useEffect(() => { console.log("🎨 Design state changed:", design); }, [design]);
  useEffect(() => { console.log("⚙️ Settings open:", showSettings); }, [showSettings]);
  console.log(design.profileLayout);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const handleOpenCard = () => {
    const slug = localStorage.getItem("profileSlug");
    if (!slug) return;
    window.open(`/cards/${slug}`, "_blank");
  };

  const MAX_LINKS = 5;

  const handleSaveAll = async () => {
    console.log(design);
    try {
      const profilePayload = {
        ...design,
        titleType: design.titleType ? design.titleType.toUpperCase() : design.titleType,
        profileSize: design.profileSize ? design.profileSize.toUpperCase() : design.profileSize,
        id: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        viewCount: undefined,
      };

      await axios.put("http://localhost:5000/api/profile/update", profilePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activeLinks = (getActiveLinks() || []).slice(0, MAX_LINKS);

      await axios.delete("http://localhost:5000/api/links/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  // ── Detect mobile ────────────────────────────────────────────────────────────
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ── Mobile branch — delegate entirely to MobileDashboard ────────────────────
  if (isMobile) {
    return (
      <MobileDashboard
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeDesignPanel={activeDesignPanel}
        setActiveDesignPanel={setActiveDesignPanel}
        activeStyleTab={activeStyleTab}
        setActiveStyleTab={setActiveStyleTab}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        design={design}
        updateDesign={updateDesign}
        updateDesignBatch={updateDesignBatch}
      />
    );
  }

  // ── Desktop layout ───────────────────────────────────────────────────────────
  return (
    <div className="w-full h-screen bg-[#f5f6f8] flex overflow-hidden">
      {/* Sidebar */}
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
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {activeSection === "links" && <Middle />}
        {activeSection === "design" && <DesignMiddle />}
      </main>

      {/* Top action bar + preview */}
      <>
        <div className="absolute top-4 right-4 z-30 flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-3 py-2">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Save
          </button>

          <div className="w-px h-6 bg-gray-200" />

          <button
            onClick={handleOpenCard}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-900 transition font-semibold text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </button>
        </div>

        <MobilePreview activeSection={activeSection} />
      </>
    </div>
  );
}