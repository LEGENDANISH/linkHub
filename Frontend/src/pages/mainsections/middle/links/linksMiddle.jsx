import React, { useState, useEffect } from 'react';
import AddLinkModal from "./AddLinkModal";
import LinkCard from "./LinkCard";
import { useSelection } from './SelectionManager';

const Middle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [title, setTitle] = useState("linkhub_design");

  const { links, syncLink, deleteLink } = useSelection();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;
      const storageKey = `linkhub_design_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const design = parsed?.state?.design;
        if (design?.profileImage) setProfileImage(design.profileImage);
        if (design?.titleText) setTitle(design.titleText);
      }
    } catch (err) {
      console.error("Error reading design from localStorage:", err);
    }
  }, []);

  const MAX_LINKS = 5;
  const isAtLimit = Array.isArray(links) && links.length >= MAX_LINKS;

  const handleAddLink = (linkName) => {
    if (links.length >= MAX_LINKS) return;
    const newLink = {
      id: Date.now(),
      name: linkName,
      url: `${linkName.toLowerCase().replace(/\s+/g, '')}.com`,
      clicks: 0,
      active: false,
    };
    syncLink(newLink);
  };

  const deleteLinkHandler = (id) => deleteLink(id);

  return (
    <main className="flex-1 overflow-y-auto" style={{ background: "transparent" }}>

      {/* ── STICKY HEADER ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 px-5 sm:px-7 pt-5 pb-4"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(147,51,234,0.08)",
        }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: "#18112e" }}>Links</h1>
            <p className="text-xs mt-0.5" style={{ color: "#a78bca" }}>
              {links.length} / {MAX_LINKS} links used
            </p>
          </div>
          {/* mini progress bar */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(147,51,234,0.1)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(links.length / MAX_LINKS) * 100}%`,
                  background: isAtLimit
                    ? "linear-gradient(90deg,#dc2626,#ef4444)"
                    : "linear-gradient(90deg,#7c3aed,#a855f7)",
                  boxShadow: isAtLimit ? "none" : "0 0 6px rgba(124,58,237,0.4)",
                }} />
            </div>
            <span className="text-[11px] font-semibold" style={{ color: isAtLimit ? "#dc2626" : "#7c3aed" }}>
              {isAtLimit ? "Full" : `${MAX_LINKS - links.length} left`}
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5">

        {/* Profile card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.05),rgba(168,85,247,0.03))",
            border: "1px solid rgba(147,51,234,0.1)",
          }}>
          {/* avatar */}
          <div className="relative shrink-0">
            {profileImage ? (
              <img src={profileImage} alt="Profile"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                style={{ border: "2.5px solid rgba(124,58,237,0.25)", boxShadow: "0 4px 12px rgba(124,58,237,0.2)" }} />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#ddd6fe,#ede9fe)", border: "2.5px solid rgba(124,58,237,0.2)" }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="#7c3aed" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            {/* online dot */}
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full"
              style={{ background: "#22c55e", border: "2px solid white", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
          </div>

          {/* info */}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-base sm:text-lg truncate" style={{ color: "#18112e" }}>
              {title || "linkhub_design"}
            </p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "#a78bca" }}>Your public profile page</p>
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={() => !isAtLimit && setOpenModal(true)}
          disabled={isAtLimit}
          className="w-full py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
          style={{
            background: isAtLimit
              ? "rgba(0,0,0,0.05)"
              : "linear-gradient(135deg,#7c3aed,#9333ea)",
            color: isAtLimit ? "#9ca3af" : "#fff",
            border: isAtLimit ? "1px dashed rgba(0,0,0,0.12)" : "none",
            boxShadow: isAtLimit ? "none" : "0 4px 16px rgba(124,58,237,0.4),inset 0 1px 0 rgba(255,255,255,0.15)",
            cursor: isAtLimit ? "not-allowed" : "pointer",
          }}
          onMouseEnter={e => { if (!isAtLimit) e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.55),inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          onMouseLeave={e => { if (!isAtLimit) e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.4),inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        >
          {isAtLimit ? "Link limit reached (5 max)" : "+ Add Link"}
        </button>

        {openModal && (
          <AddLinkModal onClose={() => setOpenModal(false)} onAddLink={handleAddLink} />
        )}

        {/* Links list */}
        {Array.isArray(links) && links.length > 0 ? (
          <div className="space-y-3">
            {links.map((link, i) => (
              <div key={link.id}
                className="transition-all"
                style={{ animationDelay: `${i * 40}ms` }}>
                <LinkCard link={link} onDelete={deleteLinkHandler} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg,#f3f0ff,#ede9fe)", border: "1px solid rgba(147,51,234,0.12)" }}>
              <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" stroke="#7c3aed" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <p className="font-bold text-sm sm:text-base mb-1.5" style={{ color: "#18112e" }}>No links yet</p>
            <p className="text-xs sm:text-sm" style={{ color: "#a78bca" }}>
              Hit <span className="font-semibold" style={{ color: "#7c3aed" }}>+ Add Link</span> above to get started
            </p>
          </div>
        )}

        {/* bottom breathing room */}
        <div className="h-4" />
      </div>
    </main>
  );
};

export default Middle;
