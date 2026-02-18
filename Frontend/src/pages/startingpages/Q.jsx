import { useState, useEffect, useRef } from "react";

// ─── Storage Helpers ────────────────────────────────────────────────────────

const ONBOARDING_KEY = "onboarding_data";
const LINKS_KEY = "Linkhub_links_data";
const DESIGN_KEY = "design_state";

function saveOnboarding(data) {
  try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data)); } catch {}
}
function loadOnboarding() {
  try { const d = localStorage.getItem(ONBOARDING_KEY); return d ? JSON.parse(d) : null; } catch { return null; }
}
function saveLinks(links) {
  try {
    localStorage.setItem(LINKS_KEY, JSON.stringify({ state: { links, isLoaded: true }, version: 0 }));
    console.log("done")
  } catch {}
}
function saveDesign(profileImage, title, bio) {
  try {
    const existing = localStorage.getItem(DESIGN_KEY);
    const parsed = existing ? JSON.parse(existing) : { state: { design: {} }, version: 0 };
    parsed.state.design = {
      ...parsed.state.design,
      profileImage: profileImage || null,
      title: title || "",
      pageTextColor: "#ffffff",
      buttonColor: "#ffffff",
      buttonTextColor: "#000000",
      buttonStyle: "glass",
      cornerRoundness: "full",
      theme: "custom",
      backgroundColor: "#6d28d9",
    };
    localStorage.setItem(DESIGN_KEY, JSON.stringify(parsed));
  } catch {}
}

// ─── Platform Icons (SVG inline) ─────────────────────────────────────────────

const PLATFORM_CONFIG = {
  instagram: {
    name: "Instagram",
    color: "from-purple-600 to-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  whatsapp: {
    name: "WhatsApp",
    color: "from-green-500 to-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  tiktok: {
    name: "TikTok",
    color: "from-gray-900 to-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/>
      </svg>
    ),
  },
  youtube: {
    name: "YouTube",
    color: "from-red-600 to-red-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  website: {
    name: "Website",
    color: "from-blue-500 to-cyan-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
  spotify: {
    name: "Spotify",
    color: "from-green-400 to-green-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  threads: {
    name: "Threads",
    color: "from-gray-800 to-black",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.155 3.07.856 1.957.868 5.174-1.386 7.358-1.787 1.75-4.065 2.444-7.447 2.451zm.607-11.403c-.3 0-.605.013-.907.042-1.848.17-2.96 1.024-2.893 2.258.064 1.17 1.261 1.812 2.876 1.724 1.156-.063 2.004-.495 2.52-1.283.482-.739.708-1.72.671-2.913a10.559 10.559 0 0 0-2.267.172z"/>
      </svg>
    ),
  },
  facebook: {
    name: "Facebook",
    color: "from-blue-600 to-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  twitter: {
    name: "X / Twitter",
    color: "from-gray-900 to-black",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    color: "from-blue-700 to-blue-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  twitch: {
    name: "Twitch",
    color: "from-purple-600 to-purple-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
  },
  snapchat: {
    name: "Snapchat",
    color: "from-yellow-400 to-yellow-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.14.08.34.17.68.17.27-.01.53-.09.78-.16l.05-.015c.28-.085.54-.17.81-.17.5 0 1.13.26 1.13.83 0 .75-1 1.47-2.43 1.88-.025.006-.05.01-.075.014-.175.03-.355.055-.545.075-.14.43-.28.83-.42 1.19.78.68 2.28 1.73 3.56 2.48.23.14.45.28.66.42.54.37.66.68.66.87 0 .73-1.03 1.27-2.47 1.51-.32.04-.59.04-.82.01a3.38 3.38 0 01-.62-.13c-.195-.06-.39-.11-.58-.14-.37-.065-.73.12-.97.35-.42.37-.83.85-1.41 1.21a5.57 5.57 0 01-3.07.87c-1.18 0-2.39-.3-3.35-.91-.58-.36-1-.84-1.41-1.21-.24-.23-.6-.415-.97-.35-.19.03-.385.08-.58.14a3.38 3.38 0 01-.62.13c-.23.03-.5.03-.82-.01C1.03 18.27 0 17.73 0 17c0-.19.12-.5.66-.87.21-.14.43-.28.66-.42 1.28-.75 2.78-1.8 3.56-2.48-.14-.36-.28-.76-.42-1.19-.19-.02-.37-.045-.545-.075-.025-.004-.05-.008-.075-.014C2.43 11.55 1.43 10.83 1.43 10.08c0-.57.63-.83 1.13-.83.27 0 .53.085.81.17l.05.015c.25.07.51.15.78.16.34 0 .54-.09.68-.17l-.03-.51-.003-.06c-.104-1.628-.23-3.654.299-4.847C6.04 1.143 9.406.793 12.207.793z"/>
      </svg>
    ),
  },
};

// ─── CSS Styles ──────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body, #root { font-family: 'Plus Jakarta Sans', sans-serif; }

.ob-root {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f0ff 50%, #fdf0ff 100%);
  display: flex;
  flex-direction: column;
}

.ob-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.35s cubic-bezier(.4,0,.2,1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

.ob-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
}

.ob-back-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}
.ob-back-btn:hover { color: #111; background: #f3f4f6; }

.ob-skip-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}
.ob-skip-btn:hover { color: #111; background: #f3f4f6; }

.ob-progress-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.ob-progress-track {
  width: 256px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.ob-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899);
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(.4,0,.2,1);
}

.ob-title-wrap {
  text-align: center;
  padding: 0 24px;
  margin-bottom: 0;
}

.ob-title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.ob-subtitle {
  margin-top: 16px;
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
}

.ob-content {
  flex: 1;
  padding: 0 24px;
  max-width: 680px;
  width: 100%;
  margin: 32px auto 0;
}

.ob-footer {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.ob-btn-primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: white;
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 16px;
  padding: 16px 48px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(109,40,217,0.3);
}
.ob-btn-primary:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: 0 8px 30px rgba(109,40,217,0.4);
}
.ob-btn-primary:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.ob-btn-full {
  width: 100%;
  max-width: 560px;
}

/* Q1 option cards */
.ob-option-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  background: white;
  transition: all 0.25s;
  margin-bottom: 16px;
}
.ob-option-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transform: scale(1.01);
}
.ob-option-card.selected {
  border-color: #7c3aed;
  box-shadow: 0 8px 30px rgba(109,40,217,0.15);
  transform: scale(1.02);
}

.ob-option-text h2 { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px; }
.ob-option-text p { font-size: 14px; color: #6b7280; }

.ob-option-icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  flex-shrink: 0;
  margin-left: 16px;
  transition: transform 0.25s;
}
.ob-option-card.selected .ob-option-icon { transform: scale(1.1); }

/* Q2 grid */
.ob-platform-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media(min-width: 480px) { .ob-platform-grid { grid-template-columns: repeat(3, 1fr); } }
@media(min-width: 640px) { .ob-platform-grid { grid-template-columns: repeat(4, 1fr); } }

.ob-platform-card {
  position: relative;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  padding: 28px 12px;
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s;
}
.ob-platform-card:hover:not(.disabled) {
  border-color: #d1d5db;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transform: scale(1.04);
}
.ob-platform-card.selected {
  border-color: #7c3aed;
  box-shadow: 0 8px 25px rgba(109,40,217,0.15);
  transform: scale(1.05);
}
.ob-platform-card.disabled { opacity: 0.4; cursor: not-allowed; }

.ob-platform-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ob-platform-name { font-size: 12px; font-weight: 700; color: #111827; text-align: center; }

.ob-platform-check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 26px;
  height: 26px;
  background: #7c3aed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.2s cubic-bezier(.4,0,.2,1);
}
@keyframes popIn { from { transform: scale(0) rotate(-90deg); } to { transform: scale(1) rotate(0); } }

.ob-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  margin-top: 16px;
}
.ob-badge-purple { background: #ede9fe; color: #7c3aed; }
.ob-badge-green { background: #d1fae5; color: #059669; }

/* Q3 link cards */
.ob-link-card {
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  padding: 24px;
  background: white;
  margin-bottom: 16px;
  transition: all 0.2s;
}
.ob-link-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }

.ob-link-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.ob-link-input {
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px 16px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background: #f9fafb;
  transition: all 0.2s;
}
.ob-link-input:focus { border-color: #7c3aed; background: white; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
.ob-link-input.error { border-color: #ef4444; background: #fef2f2; }
.ob-link-input.filled { border-color: #10b981; background: #f0fdf4; }

.ob-error-msg { color: #ef4444; font-size: 12px; font-weight: 500; margin-top: 6px; }

.ob-filled-check {
  width: 26px;
  height: 26px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.2s;
}

/* Q4 profile */
.ob-avatar-wrap {
  position: relative;
  width: 128px;
  height: 128px;
  margin: 0 auto 32px;
}

.ob-avatar {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.ob-avatar img { width: 100%; height: 100%; object-fit: cover; }

.ob-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(109,40,217,0.4);
  transition: transform 0.2s;
}
.ob-avatar-btn:hover { transform: scale(1.1); }

.ob-field-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }

.ob-text-input {
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 18px;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
  background: white;
  transition: all 0.2s;
  margin-bottom: 20px;
}
.ob-text-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

.ob-textarea {
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 18px;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
  background: white;
  transition: all 0.2s;
  resize: none;
  height: 120px;
  position: relative;
}
.ob-textarea:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

.ob-char-count { position: absolute; bottom: 16px; right: 16px; font-size: 11px; color: #9ca3af; }

/* Final screen */
.ob-final {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0e7ff 0%, #fce7f3 50%, #e7f0ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.ob-confetti-dot {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  from { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

.ob-final-header {
  text-align: center;
  padding: 64px 24px 0;
  animation: fadeUp 0.6s 0.3s both;
}

.ob-final-header h1 {
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.03em;
}

.ob-final-header p {
  margin-top: 12px;
  font-size: 18px;
  color: #6b7280;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.ob-template-wrap {
  margin-top: 48px;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  animation: fadeUp 0.6s 0.6s both;
}

.ob-final-btn-wrap {
  padding: 32px 24px 48px;
  animation: fadeUp 0.6s 0.9s both;
}

/* Creator template */
.ob-tmpl {
  width: 100%;
  max-width: 380px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.ob-tmpl-creator {
  background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
}

.ob-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  mix-blend-mode: multiply;
  opacity: 0.5;
  animation: blob 7s infinite;
}

@keyframes blob {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(20px,-20px) scale(1.1); }
  66% { transform: translate(-15px,15px) scale(0.9); }
}

.ob-tmpl-business {
  background: white;
}

.ob-tmpl-business-header {
  background: linear-gradient(135deg, #1d4ed8, #4f46e5, #7c3aed);
  padding: 32px 24px 48px;
  text-align: center;
}

.ob-tmpl-business-links {
  padding: 24px;
  margin-top: -16px;
  background: white;
}

.ob-tmpl-personal {
  background: linear-gradient(135deg, #fff1f2, #fce7f3, #fff7ed);
  padding: 32px 24px;
}

.ob-tmpl-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid rgba(255,255,255,0.5);
}

.ob-tmpl-avatar img { width: 100%; height: 100%; object-fit: cover; }

.ob-tmpl-name { font-size: 20px; font-weight: 700; margin-bottom: 6px; text-align: center; }
.ob-tmpl-bio { font-size: 13px; opacity: 0.85; text-align: center; }

.ob-tmpl-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}
.ob-tmpl-link:hover { transform: scale(1.03); }

.ob-tmpl-link-glass {
  background: rgba(255,255,255,0.9);
  color: #1f2937;
}

.ob-tmpl-link-outline {
  background: white;
  border: 2px solid #e5e7eb;
  color: #1f2937;
}

.ob-tmpl-link-personal {
  background: white;
  color: #374151;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.ob-dots { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
.ob-dot { width: 8px; height: 8px; border-radius: 50%; }

.ob-spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
`;

// ─── Q1 Component ─────────────────────────────────────────────────────────────

function Q1({ onContinue, onSkip, savedGoal }) {
  const [selected, setSelected] = useState(savedGoal || null);

  const options = [
    { id: "creator", title: "Creator", desc: "Build my following and explore ways to monetize my audience.", color: "from-lime-400 to-emerald-500", emoji: "🎨" },
    { id: "business", title: "Business", desc: "Grow my business and reach more customers.", color: "from-purple-500 to-indigo-600", emoji: "💼" },
    { id: "personal", title: "Personal", desc: "Share links with my friends and acquaintances.", color: "from-rose-500 to-pink-600", emoji: "✨" },
  ];

  return (
    <div className="ob-page ob-root">
      <style>{css}</style>
      <div className="ob-topbar">
        <div />
        <button className="ob-skip-btn" onClick={onSkip}>Skip</button>
      </div>
      <div className="ob-progress-wrap">
        <div className="ob-progress-track">
          <div className="ob-progress-fill" style={{ width: "25%" }} />
        </div>
      </div>
      <div className="ob-title-wrap">
        <h1 className="ob-title">Which best describes your goal<br />for using LinkHub?</h1>
        <p className="ob-subtitle">This helps us personalize your experience.</p>
      </div>
      <div className="ob-content">
        {options.map((item) => (
          <div
            key={item.id}
            className={`ob-option-card${selected === item.id ? " selected" : ""}`}
            onClick={() => setSelected(item.id)}
          >
            <div className="ob-option-text">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
            <div className={`ob-option-icon bg-gradient-to-br ${item.color}`}>
              {item.emoji}
            </div>
          </div>
        ))}
      </div>
      <div className="ob-footer">
        <button
          className="ob-btn-primary"
          disabled={!selected}
          onClick={() => selected && onContinue(selected)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Q2 Component ─────────────────────────────────────────────────────────────

function Q2({ onContinue, onBack, onSkip, savedPlatforms }) {
  const MAX = 5;
  const [selected, setSelected] = useState(savedPlatforms || []);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < MAX) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="ob-page ob-root">
      <style>{css}</style>
      <div className="ob-topbar">
        <button className="ob-back-btn" onClick={onBack}>← Back</button>
        <button className="ob-skip-btn" onClick={onSkip}>Skip</button>
      </div>
      <div className="ob-progress-wrap">
        <div className="ob-progress-track">
          <div className="ob-progress-fill" style={{ width: "50%" }} />
        </div>
      </div>
      <div className="ob-title-wrap">
        <h1 className="ob-title">Which platforms<br />are you on?</h1>
        <p className="ob-subtitle">Pick up to {MAX}. You can always update later.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="ob-badge ob-badge-purple">{selected.length}/{MAX} selected</span>
        </div>
      </div>
      <div className="ob-content">
        <div className="ob-platform-grid">
          {Object.entries(PLATFORM_CONFIG).map(([id, cfg]) => {
            const isSelected = selected.includes(id);
            const isDisabled = !isSelected && selected.length >= MAX;
            return (
              <div
                key={id}
                className={`ob-platform-card${isSelected ? " selected" : ""}${isDisabled ? " disabled" : ""}`}
                onClick={() => !isDisabled && toggle(id)}
              >
                {isSelected && (
                  <div className="ob-platform-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                <div className={`ob-platform-icon-wrap bg-gradient-to-br ${cfg.color}`}>
                  {cfg.icon}
                </div>
                <span className="ob-platform-name">{cfg.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ob-footer">
        <button
          className="ob-btn-primary"
          disabled={selected.length === 0}
          onClick={() => selected.length > 0 && onContinue(selected)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Q3 Component ─────────────────────────────────────────────────────────────

function Q3({ selectedPlatforms, onContinue, onBack, onSkip, savedLinks }) {
  const [links, setLinks] = useState(savedLinks || {});
  const [errors, setErrors] = useState({});

  const placeholders = {
    instagram: "instagram.com/yourhandle",
    whatsapp: "+1234567890",
    tiktok: "tiktok.com/@yourhandle",
    youtube: "youtube.com/@yourchannel",
    website: "https://yourwebsite.com",
    spotify: "open.spotify.com/artist/...",
    threads: "threads.net/@yourhandle",
    facebook: "facebook.com/yourpage",
    twitter: "x.com/yourhandle",
    linkedin: "linkedin.com/in/yourprofile",
    twitch: "twitch.tv/yourchannel",
    snapchat: "snapchat.com/add/yourhandle",
  };

  const labels = {
    instagram: "Instagram Profile", whatsapp: "WhatsApp Number",
    tiktok: "TikTok Profile", youtube: "YouTube Channel",
    website: "Personal Website", spotify: "Spotify Profile",
    threads: "Threads Profile", facebook: "Facebook Page",
    twitter: "X / Twitter Profile", linkedin: "LinkedIn Profile",
    twitch: "Twitch Channel", snapchat: "Snapchat Profile",
  };

  const filledCount = Object.values(links).filter(v => v && v.trim() !== "").length;

  const handleInput = (id, val) => {
    setLinks(prev => ({ ...prev, [id]: val }));
    if (errors[id] && val.trim()) setErrors(prev => ({ ...prev, [id]: false }));
  };

  const handleContinue = () => {
    const newErrors = {};
    let valid = true;
    selectedPlatforms.forEach(id => {
      if (!links[id] || !links[id].trim()) { newErrors[id] = true; valid = false; }
    });
    setErrors(newErrors);
    if (valid) onContinue(links);
  };

  return (
    <div className="ob-page ob-root">
      <style>{css}</style>
      <div className="ob-topbar">
        <button className="ob-back-btn" onClick={onBack}>← Back</button>
        <button className="ob-skip-btn" onClick={onSkip}>Skip</button>
      </div>
      <div className="ob-progress-wrap">
        <div className="ob-progress-track">
          <div className="ob-progress-fill" style={{ width: "75%" }} />
        </div>
      </div>
      <div className="ob-title-wrap">
        <h1 className="ob-title">Add your links</h1>
        <p className="ob-subtitle">Complete the fields below to add your content.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="ob-badge ob-badge-green">✓ {filledCount}/{selectedPlatforms.length} completed</span>
        </div>
      </div>
      <div className="ob-content" style={{ overflow: "auto" }}>
        {selectedPlatforms.map(id => {
          const cfg = PLATFORM_CONFIG[id];
          const isFilled = !!(links[id] && links[id].trim());
          const hasError = errors[id];
          return (
            <div key={id} className="ob-link-card">
              <div className="ob-link-card-header">
                <div className={`ob-platform-icon-wrap bg-gradient-to-br ${cfg.color}`}>
                  {cfg.icon}
                </div>
                <span style={{ flex: 1, fontWeight: 700, fontSize: 16, color: "#111827" }}>{labels[id]}</span>
                {isFilled && (
                  <div className="ob-filled-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="text"
                className={`ob-link-input${hasError ? " error" : isFilled ? " filled" : ""}`}
                placeholder={placeholders[id]}
                value={links[id] || ""}
                onChange={e => handleInput(id, e.target.value)}
              />
              {hasError && <p className="ob-error-msg">Please enter your {labels[id].toLowerCase()}</p>}
            </div>
          );
        })}
      </div>
      <div className="ob-footer" style={{ paddingTop: 8 }}>
        <button
          className="ob-btn-primary ob-btn-full"
          disabled={filledCount === 0}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Q4 Component ─────────────────────────────────────────────────────────────

function Q4({ onContinue, onBack, onSkip, savedProfile }) {
  const [name, setName] = useState(savedProfile?.username || "");
  const [bio, setBio] = useState(savedProfile?.bio || "");
  const [image, setImage] = useState(savedProfile?.image || null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    onContinue({ username: name, bio, image });
  };

  return (
    <div className="ob-page ob-root">
      <style>{css}</style>
      <div className="ob-topbar">
        <button className="ob-back-btn" onClick={onBack}>← Back</button>
        <button className="ob-skip-btn" onClick={onSkip}>Skip</button>
      </div>
      <div className="ob-progress-wrap">
        <div className="ob-progress-track">
          <div className="ob-progress-fill" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="ob-title-wrap">
        <h1 className="ob-title">Add profile details</h1>
        <p className="ob-subtitle">Add your profile image, name, and bio.</p>
      </div>
      <div className="ob-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="ob-avatar-wrap">
          <div className="ob-avatar">
            {image ? (
              <img src={image} alt="profile" />
            ) : (
              <span style={{ fontSize: 48, color: "#9ca3af" }}>👤</span>
            )}
          </div>
          <button className="ob-avatar-btn" onClick={() => fileRef.current.click()}>+</button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
        </div>

        <div style={{ width: "100%" }}>
          <p className="ob-field-label">Display Name</p>
          <input
            type="text"
            className="ob-text-input"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div style={{ width: "100%", position: "relative" }}>
          <p className="ob-field-label">Bio <span style={{ fontWeight: 400, color: "#9ca3af" }}>(optional)</span></p>
          <textarea
            className="ob-textarea"
            placeholder="Tell people about yourself..."
            value={bio}
            onChange={e => { if (e.target.value.length <= 160) setBio(e.target.value); }}
          />
          <span className="ob-char-count" style={{ color: bio.length > 140 ? "#f97316" : "#9ca3af" }}>
            {bio.length}/160
          </span>
        </div>
      </div>
      <div className="ob-footer" style={{ paddingTop: 8 }}>
        <button
          className="ob-btn-primary ob-btn-full"
          disabled={!name.trim() || loading}
          onClick={handleContinue}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div className="ob-spinner" />
              Creating your LinkHub...
            </span>
          ) : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ─── Final Component ──────────────────────────────────────────────────────────

function CreatorTemplate({ profileData, selectedPlatforms }) {
  return (
    <div className="ob-tmpl ob-tmpl-creator" style={{ position: "relative" }}>
      <div className="ob-blob" style={{ width: 120, height: 120, background: "#c4b5fd", top: 10, left: 10 }} />
      <div className="ob-blob" style={{ width: 120, height: 120, background: "#fbcfe8", top: 40, right: 10, animationDelay: "2s" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 24 }}>
        <div className="ob-tmpl-avatar" style={{ background: "rgba(255,255,255,0.25)" }}>
          {profileData?.image ? <img src={profileData.image} alt="" /> : <span style={{ fontSize: 32 }}>👤</span>}
        </div>
        <p className="ob-tmpl-name" style={{ color: "white" }}>{profileData?.username || "Your Name"}</p>
        {profileData?.bio && <p className="ob-tmpl-bio" style={{ color: "rgba(255,255,255,0.85)" }}>{profileData.bio}</p>}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {selectedPlatforms?.slice(0, 5).map(id => {
          const cfg = PLATFORM_CONFIG[id];
          return cfg ? (
            <div key={id} className="ob-tmpl-link ob-tmpl-link-glass">
              <div className={`ob-platform-icon-wrap bg-gradient-to-br ${cfg.color}`} style={{ width: 28, height: 28, borderRadius: 8, minWidth: 28 }}>
                <div style={{ transform: "scale(0.7)" }}>{cfg.icon}</div>
              </div>
              <span>{cfg.name}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

function BusinessTemplate({ profileData, selectedPlatforms }) {
  return (
    <div className="ob-tmpl ob-tmpl-business">
      <div className="ob-tmpl-business-header">
        <div className="ob-tmpl-avatar" style={{ background: "rgba(255,255,255,0.2)" }}>
          {profileData?.image ? <img src={profileData.image} alt="" /> : <span style={{ fontSize: 32 }}>💼</span>}
        </div>
        <p className="ob-tmpl-name" style={{ color: "white" }}>{profileData?.username || "Business Name"}</p>
        {profileData?.bio && <p className="ob-tmpl-bio" style={{ color: "rgba(255,255,255,0.8)" }}>{profileData.bio}</p>}
      </div>
      <div className="ob-tmpl-business-links" style={{ marginTop: -16 }}>
        {selectedPlatforms?.slice(0, 5).map(id => {
          const cfg = PLATFORM_CONFIG[id];
          return cfg ? (
            <div key={id} className="ob-tmpl-link ob-tmpl-link-outline">
              <div className={`ob-platform-icon-wrap bg-gradient-to-br ${cfg.color}`} style={{ width: 28, height: 28, borderRadius: 8, minWidth: 28 }}>
                <div style={{ transform: "scale(0.7)" }}>{cfg.icon}</div>
              </div>
              <span>{cfg.name}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

function PersonalTemplate({ profileData, selectedPlatforms }) {
  return (
    <div className="ob-tmpl ob-tmpl-personal">
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div className="ob-tmpl-avatar" style={{ background: "rgba(255,255,255,0.6)", border: "3px solid white" }}>
          {profileData?.image ? <img src={profileData.image} alt="" /> : <span style={{ fontSize: 32 }}>✨</span>}
        </div>
        <p className="ob-tmpl-name" style={{ color: "#111827" }}>{profileData?.username || "Your Name"}</p>
        {profileData?.bio && <p className="ob-tmpl-bio" style={{ color: "#6b7280" }}>{profileData.bio}</p>}
      </div>
      {selectedPlatforms?.slice(0, 5).map(id => {
        const cfg = PLATFORM_CONFIG[id];
        return cfg ? (
          <div key={id} className="ob-tmpl-link ob-tmpl-link-personal">
            <div className={`ob-platform-icon-wrap bg-gradient-to-br ${cfg.color}`} style={{ width: 28, height: 28, borderRadius: 8, minWidth: 28 }}>
              <div style={{ transform: "scale(0.7)" }}>{cfg.icon}</div>
            </div>
            <span>{cfg.name}</span>
          </div>
        ) : null;
      })}
      <div className="ob-dots">
        <div className="ob-dot" style={{ background: "#fda4af" }} />
        <div className="ob-dot" style={{ background: "#f9a8d4" }} />
        <div className="ob-dot" style={{ background: "#fdba74" }} />
      </div>
    </div>
  );
}

function Final({ userGoal, profileData, selectedPlatforms, onContinue }) {
  const confettiRef = useRef(null);

  useEffect(() => {
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#a855f7", "#ec4899", "#6366f1", "#06b6d4"];
    if (!confettiRef.current) return;
    for (let i = 0; i < 80; i++) {
      const dot = document.createElement("div");
      dot.className = "ob-confetti-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = "-20px";
      dot.style.width = (Math.random() * 8 + 6) + "px";
      dot.style.height = (Math.random() * 8 + 6) + "px";
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.animationDelay = Math.random() * 2 + "s";
      dot.style.animationDuration = (Math.random() * 2 + 2) + "s";
      confettiRef.current.appendChild(dot);
    }
  }, []);

  const renderTemplate = () => {
    if (userGoal === "business") return <BusinessTemplate profileData={profileData} selectedPlatforms={selectedPlatforms} />;
    if (userGoal === "personal") return <PersonalTemplate profileData={profileData} selectedPlatforms={selectedPlatforms} />;
    return <CreatorTemplate profileData={profileData} selectedPlatforms={selectedPlatforms} />;
  };

  return (
    <div className="ob-final ob-root">
      <style>{css}</style>
      <div ref={confettiRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }} />
      <div className="ob-final-header">
        <h1>Looking good! 🎉</h1>
        <p>Your LinkHub is off to a great start.<br />Continue building to make it even better.</p>
      </div>
      <div className="ob-template-wrap">{renderTemplate()}</div>
      <div className="ob-final-btn-wrap">
        <button className="ob-btn-primary ob-btn-full" onClick={onContinue}>
          Continue building this LinkHub
        </button>
      </div>
    </div>
  );
}

// ─── Main Onboarding Flow ─────────────────────────────────────────────────────

export default function OnboardingFlow() {
  // Load saved state
  const saved = loadOnboarding();

  const [step, setStep] = useState(() => {
    if (!saved) return 0;
    if (saved.completed) return 5; // final
    if (saved.profileData?.username) return 4;
    if (saved.platformLinks && Object.keys(saved.platformLinks).length > 0) return 3;
    if (saved.selectedPlatforms?.length > 0) return 2;
    if (saved.userGoal) return 1;
    return 0;
  });

  const [data, setData] = useState({
    userGoal: saved?.userGoal || "",
    selectedPlatforms: saved?.selectedPlatforms || [],
    platformLinks: saved?.platformLinks || {},
    profileData: saved?.profileData || { username: "", bio: "", image: null },
  });

  const save = (updates) => {
    const newData = { ...data, ...updates };
    setData(newData);
    saveOnboarding(newData);
  };

  const handleQ1 = (goal) => {
    save({ userGoal: goal });
    setStep(2);
  };

  const handleQ2 = (platforms) => {
    save({ selectedPlatforms: platforms });
    setStep(3);
  };

  const handleQ3 = (links) => {
    save({ platformLinks: links });
    setStep(4);
  };

  const handleQ4 = (profileData) => {
    // Save profile
    const newData = { ...data, profileData, completed: true };
    setData(newData);
    saveOnboarding(newData);
    saveDesign(profileData.image, profileData.username, profileData.bio);

    // Save links in the exact format requested
    const links = data.selectedPlatforms.map((platform, index) => ({
      id: Date.now() + index,
      name: PLATFORM_CONFIG[platform]?.name || platform.charAt(0).toUpperCase() + platform.slice(1),
      url: data.platformLinks[platform] || "",
      active: true,
      clicks: 0,
      layout: "pill",
      thumbnail: null,
      animation: "none",
      locked: false,
      schedule: null,
      redirect: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    saveLinks(links);

    setStep(5);
  };

  const handleSkip = () => {
    if (step < 4) setStep(step + 1);
    else setStep(5);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    // In a real app, navigate to dashboard
    alert("Onboarding complete! Data saved to localStorage.\n\nCheck:\n• onboarding_data\n• links_state\n• design_state");
  };

  // Step 0: intro (jump to Q1)
  if (step === 0) {
    return (
      <div className="ob-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 24 }}>
        <style>{css}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 32, color: "white", fontWeight: 800 }}>L</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>Link<span style={{ color: "#10b981" }}>Hub</span></h1>
          <p style={{ color: "#6b7280", marginTop: 8, fontSize: 16 }}>One link to rule them all</p>
        </div>
        <button className="ob-btn-primary" onClick={() => setStep(1)} style={{ fontSize: 18, padding: "18px 56px" }}>
          Get Started
        </button>
      </div>
    );
  }

  if (step === 1) return <Q1 onContinue={handleQ1} onSkip={handleSkip} savedGoal={data.userGoal} />;
  if (step === 2) return <Q2 onContinue={handleQ2} onBack={handleBack} onSkip={handleSkip} savedPlatforms={data.selectedPlatforms} />;
  if (step === 3) return <Q3 selectedPlatforms={data.selectedPlatforms} onContinue={handleQ3} onBack={handleBack} onSkip={handleSkip} savedLinks={data.platformLinks} />;
  if (step === 4) return <Q4 onContinue={handleQ4} onBack={handleBack} onSkip={handleSkip} savedProfile={data.profileData} />;
  if (step === 5) return (
    <Final
      userGoal={data.userGoal}
      profileData={data.profileData}
      selectedPlatforms={data.selectedPlatforms}
      onContinue={handleFinish}
    />
  );
}