import { useState, useEffect } from "react";

// ─── Social Icon resolver ────────────────────────────────────────────────────
function getSocialIcon(url = "", name = "") {
  const str = (url + name).toLowerCase();

  if (str.includes("instagram"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  if (str.includes("twitter") || str.includes("x.com"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (str.includes("youtube"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    );
  if (str.includes("tiktok"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
      </svg>
    );
  if (str.includes("github"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  if (str.includes("linkedin"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (str.includes("facebook"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  if (str.includes("spotify"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    );
  // Generic link icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 shrink-0">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ─── QR Code ──────────────────────────────────────────────────────────────────
function QRCode({ url }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&margin=5`;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-2.5 rounded-2xl shadow-2xl ring-1 ring-white/20">
        <img src={qrUrl} alt="QR Code" className="w-28 h-28 block" />
      </div>
      <p className="text-white/40 text-xs font-mono tracking-wider">SCAN TO VISIT</p>
    </div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────
function BackgroundLayer({ profile }) {
  const { wallpaperStyle, backgroundColor, backgroundImage, backgroundVideo,
    gradientFrom, gradientTo, gradientColor, gradientAngle, gradientDirection,
    imageEffect, imageTint, noise, noiseOpacity } = profile;

  let bgContent = null;

  if (wallpaperStyle === "IMAGE" && backgroundImage) {
    const tintOpacity = (imageTint || 0) / 100;
    const isBlur = imageEffect === "blur";
    bgContent = (
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: isBlur ? "blur(10px) saturate(1.2)" : "none",
            transform: isBlur ? "scale(1.06)" : "none",
          }}
        />
        {tintOpacity > 0 && (
          <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${tintOpacity})` }} />
        )}
      </div>
    );
  } else if (wallpaperStyle === "VIDEO" && backgroundVideo) {
    bgContent = (
      <video src={backgroundVideo} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover" />
    );
  } else if (wallpaperStyle === "GRADIENT") {
    let gradient = "";
    if (gradientDirection === "radial") {
      gradient = `radial-gradient(circle, ${gradientFrom || "#444"}, ${gradientTo || gradientColor || "#000"})`;
    } else {
      const angle = gradientDirection === "linear-up" ? "0deg"
        : gradientDirection === "linear-right" ? "90deg"
        : gradientDirection === "linear-left" ? "270deg"
        : `${gradientAngle || 180}deg`;
      gradient = `linear-gradient(${angle}, ${gradientFrom || "#444"}, ${gradientTo || gradientColor || "#000"})`;
    }
    bgContent = <div className="absolute inset-0" style={{ background: gradient }} />;
  } else {
    bgContent = <div className="absolute inset-0" style={{ background: backgroundColor || "#000" }} />;
  }

  return (
    <>
      {bgContent}
      {noise && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: noiseOpacity || 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </>
  );
}

// ─── Button helpers ───────────────────────────────────────────────────────────
function getButtonRadius(cornerRoundness) {
  if (cornerRoundness === "full") return "9999px";
  if (cornerRoundness === "round") return "12px";
  if (cornerRoundness === "sharp") return "0px";
  return "8px";
}

function getButtonStyle(profile) {
  const { buttonStyle, buttonColor, buttonTextColor, buttonShadow } = profile;
  const base = {
    color: buttonTextColor || "#000",
    borderRadius: getButtonRadius(profile.cornerRoundness),
    transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
  };

  if (buttonStyle === "glass") {
    return {
      ...base,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.3)",
      color: buttonTextColor || "#fff",
    };
  }
  if (buttonStyle === "outline") {
    return {
      ...base,
      background: "transparent",
      border: `2px solid ${buttonColor || "#fff"}`,
      color: buttonColor || "#fff",
    };
  }
  if (buttonStyle === "soft") {
    return {
      ...base,
      background: (buttonColor || "#fff") + "28",
      border: `1px solid ${(buttonColor || "#fff") + "44"}`,
      color: buttonTextColor || "#fff",
    };
  }
  if (buttonStyle === "shadow") {
    return {
      ...base,
      background: buttonColor || "#fff",
      boxShadow: `0 8px 30px rgba(0,0,0,0.35)`,
    };
  }
  // fill (default)
  return {
    ...base,
    background: buttonColor || "#fff",
  };
}

// ─── Link card ────────────────────────────────────────────────────────────────
function LinkCard({ link, profile, index }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (link.locked) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    window.open(link.redirect || link.url, "_blank", "noopener,noreferrer");
  };

  const btnStyle = getButtonStyle(profile);
  const delay = `${index * 90 + 200}ms`;

  const hoverScale = hovered && !link.locked
    ? link.animation === "bounce" ? "scale(1.05) translateY(-3px)" : "scale(1.025)"
    : pressed ? "scale(0.97)" : "scale(1)";

  return (
    <div
      className="w-full"
      style={{ animation: `slideUp 0.45s cubic-bezier(.22,1,.36,1) ${delay} both` }}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={link.locked}
        className="w-full flex items-center gap-3 px-5 py-[14px] relative overflow-hidden cursor-pointer select-none"
        style={{
          ...btnStyle,
          transform: hoverScale,
          filter: hovered && !link.locked ? "brightness(1.12)" : "brightness(1)",
          opacity: link.locked ? 0.55 : 1,
          cursor: link.locked ? "not-allowed" : "pointer",
        }}
      >
        {/* Spotlight shimmer */}
        {hovered && link.animation === "spotlight" && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
          />
        )}

        {/* Icon / Thumbnail */}
        <span className="shrink-0">
          {link.thumbnail
            ? <img src={link.thumbnail} alt="" className="w-9 h-9 rounded-xl object-cover" />
            : getSocialIcon(link.url, link.name)
          }
        </span>

        <span
          className="flex-1 text-center font-semibold text-[15px] tracking-wide"
          style={{ fontFamily: profile.pageTextFont ? `'${profile.pageTextFont}', sans-serif` : "inherit" }}
        >
          {link.name}
        </span>

        {link.locked
          ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 opacity-50">
              <path d="M12 1a5 5 0 00-5 5v3H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V11a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v3H9V6a3 3 0 013-3zm0 9a2 2 0 110 4 2 2 0 010-4z" />
            </svg>
          )
          : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="w-4 h-4 shrink-0 opacity-40">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )
        }
      </button>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ profile }) {
  const size = profile.profileSize === "SMALL" ? "80px" : profile.profileSize === "LARGE" ? "120px" : "96px";
 const radius = profile.profileShape === "circle" ? "50%"
  : profile.profileShape === "hexagon" ? "20px" : "16px";
  return (
    <div
      style={{
        width: size, height: size, borderRadius: radius,
        overflow: "hidden",
        boxShadow: "0 0 0 3px rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.4)",
        animation: "popIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.05s both",
        flexShrink: 0,
      }}
    >
      {profile.profileImage
        ? <img src={profile.profileImage} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : (
          <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" style={{ width: 40, height: 40 }}>
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )
      }
    </div>
  );
}

// ─── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage({
  slug = "devxanish05saq44g",
  apiBase = "http://localhost:5000/api",
  initialData = null,
}) {
  const [profile, setProfile] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  const DEMO = {
    slug: "devxanish05saq44g",
    profileImage: null,
    bio: "Digital creator & developer",
    titleType: "TEXT",
    titleText: "Anishhhhhh",
    titleAlignment: "center",
    titleFontSize: "26px",
    titleFontWeight: "bold",
    titleColor: "#ffffff",
    titleFont: "Inter",
    profileLayout: "CLASSIC",
    profileSize: "MEDIUM",
    profileShape: "circle",
    wallpaperStyle: "IMAGE",
    backgroundColor: "#0a0a0a",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    backgroundVideo: null,
    imageEffect: "blur",
    imageTint: 46,
    buttonStyle: "glass",
    cornerRoundness: "full",
    buttonColor: "#ffffff",
    buttonTextColor: "#ffffff",
    buttonShadow: "none",
    pageTextFont: "Belanosima",
    pageTextColor: "#ffffff",
    gradientDirection: "radial",
    gradientFrom: null,
    gradientTo: null,
    noise: false,
    noiseOpacity: 0.05,
    footerText: "",
    footerVisible: true,
    links: [
      { id: 1, name: "Instagram", url: "https://instagram.com", iconType: "auto", thumbnail: null, layout: "classic", animation: "spotlight", active: true, clicks: 0, locked: false, redirect: null },
      { id: 2, name: "Twitter / X", url: "https://twitter.com", iconType: "auto", thumbnail: null, layout: "classic", animation: "bounce", active: true, clicks: 0, locked: false, redirect: null },
      { id: 3, name: "YouTube", url: "https://youtube.com", iconType: "auto", thumbnail: null, layout: "classic", animation: "none", active: true, clicks: 0, locked: false, redirect: null },
    ],
    user: { name: "Anish Kr", username: "devxanish05saq44g" },
  };

  useEffect(() => {
    if (initialData) return;
    async function fetchProfile() {
      try {
        const res = await fetch(`${apiBase}/profile/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setProfile(json.success && json.data ? json.data : DEMO);
      } catch {
        setProfile(DEMO);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [slug, apiBase]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="spinner" />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "monospace" }}>loading…</p>
        </div>
      </div>
    );
  }

  const p = profile || DEMO;
  const activeLinks = (p.links || []).filter((l) => l.active);
  const pageUrl = typeof window !== "undefined" ? window.location.href : `https://linkhub.app/${p.slug}`;

  const titleAlignStyle =
    p.titleAlignment === "left" ? { alignItems: "flex-start", textAlign: "left" }
      : p.titleAlignment === "right" ? { alignItems: "flex-end", textAlign: "right" }
      : { alignItems: "center", textAlign: "center" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Belanosima:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.65); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .spinner {
          width: 36px; height: 36px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Desktop phone shell */
        .phone-shell {
          position: relative;
          width: 390px;
          max-height: 844px;
          border-radius: 48px;
          overflow: hidden;
          box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .phone-shell {
            width: 100vw;
            max-height: none;
            border-radius: 0;
            min-height: 100dvh;
          }
          .desktop-bg { display: none !important; }
          .desktop-sidebar { display: none !important; }
          .desktop-qr { display: none !important; }
          .outer-wrap { background: transparent !important; }
        }

        .scrollable {
          overflow-y: auto;
          scrollbar-width: none;
        }
        .scrollable::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Outer desktop wrapper ──────────────────────────────────────────── */}
      <div
        className="outer-wrap"
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "40px 24px",
        }}
      >
        {/* Desktop ambient bg */}
        <div
          className="desktop-bg"
          style={{
            position: "fixed", inset: 0, zIndex: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Desktop layout: sidebar + phone + QR */}
        <div style={{ display: "flex", alignItems: "center", gap: 60, position: "relative", zIndex: 1 }}>

          {/* ── Left sidebar (desktop only) ─────────────────────────────── */}
          <div
            className="desktop-sidebar"
            style={{ display: "flex", flexDirection: "column", gap: 28, width: 200, animation: "fadeIn 0.6s ease 0.2s both" }}
          >
            <div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "DM Sans, sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
                Profile
              </p>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>
                {p.titleText || p.user?.name}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>
                @{p.user?.username || p.slug}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeLinks.slice(0, 6).map((link) => (
                <a
                  key={link.id}
                  href={link.redirect || link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    color: "rgba(255,255,255,0.4)", textDecoration: "none",
                    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
                  <span style={{ flexShrink: 0 }}>{getSocialIcon(link.url, link.name)}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.name}</span>
                </a>
              ))}
              {activeLinks.length > 6 && (
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, paddingLeft: 28, fontFamily: "monospace" }}>
                  +{activeLinks.length - 6} more
                </p>
              )}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontFamily: "monospace" }}>
                {activeLinks.length} link{activeLinks.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* ── Phone frame ─────────────────────────────────────────────── */}
          <div className="phone-shell">
            {/* Background */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <BackgroundLayer profile={p} />
            </div>

            {/* Content */}
            <div
              className="scrollable"
              style={{
                position: "relative", zIndex: 1,
                display: "flex", flexDirection: "column",
                minHeight: "100%", height: "100%",
              }}
            >
              {/* Safe-area top */}
              <div style={{ paddingTop: 56 }} />

              {/* Profile header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px",
                  gap: 12,
                  ...titleAlignStyle,
                }}
              >
                <Avatar profile={p} />

                <div
                  style={{
                    display: "flex", flexDirection: "column", gap: 4,
                    animation: "slideUp 0.45s ease 0.12s both",
                    ...titleAlignStyle,
                  }}
                >
                  {p.titleType === "TEXT" && p.titleText && (
                    <h1 style={{
                      fontSize: p.titleFontSize || "24px",
                      fontWeight: p.titleFontWeight || "700",
                      color: p.titleColor || "#fff",
                      fontFamily: p.titleFont ? `'${p.titleFont}', sans-serif` : "'DM Sans', sans-serif",
                      lineHeight: 1.2,
                    }}>
                      {p.titleText}
                    </h1>
                  )}
                  {p.titleType === "LOGO" && p.logoUrl && (
                    <img src={p.logoUrl} alt="logo" style={{ height: 40, objectFit: "contain" }} />
                  )}

                  <p style={{
                    color: (p.pageTextColor || "#fff") + "88",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    @{p.user?.username || p.slug}
                  </p>

                  {p.bio && (
                    <p style={{
                      color: p.pageTextColor || "#fff",
                      fontSize: 13,
                      lineHeight: 1.6,
                      opacity: 0.75,
                      maxWidth: 280,
                      marginTop: 2,
                      fontFamily: p.pageTextFont ? `'${p.pageTextFont}', sans-serif` : "inherit",
                    }}>
                      {p.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "24px 20px 16px" }}>
                {activeLinks.map((link, i) => (
                  <LinkCard key={link.id} link={link} profile={p} index={i} />
                ))}
                {activeLinks.length === 0 && (
                  <p style={{ color: (p.pageTextColor || "#fff") + "55", textAlign: "center", fontSize: 13, padding: "16px 0" }}>
                    No links yet.
                  </p>
                )}
              </div>

              {/* Footer */}
              {p.footerVisible && (
                <div style={{ marginTop: "auto", padding: "12px 20px 32px", textAlign: "center" }}>
                  {p.footerText && p.footerText !== "." && (
                    <p style={{ color: (p.pageTextColor || "#fff") + "44", fontSize: 11, marginBottom: 4 }}>
                      {p.footerText}
                    </p>
                  )}
                  <p style={{ color: (p.pageTextColor || "#fff") + "33", fontSize: 11, fontFamily: "monospace" }}>
                    Powered by <strong>LinkHub</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: QR code (desktop only) ──────────────────────────── */}
          <div
            className="desktop-qr"
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 16, animation: "fadeIn 0.6s ease 0.4s both",
            }}
          >
            <QRCode url={pageUrl} />

            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {p.slug}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}