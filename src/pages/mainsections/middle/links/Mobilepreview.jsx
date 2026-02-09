import React from "react";
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager";
import { useSelection } from "../mainsections/middle/links/Selectionmanager";

export default function MobilePreview() {
  const { design } = useDesign();
  const { getActiveLinks } = useSelection();

  // Active links from Zustand
  const activeLinks = getActiveLinks() || [];

  // Generate background style based on wallpaper settings
  const getBackgroundStyle = () => {
    const baseStyle = {
      color: design.pageTextColor,
      position: "relative",
      overflow: "hidden",
    };

    // Apply wallpaper style
    if (design.wallpaperStyle === "fill") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else if (design.wallpaperStyle === "gradient") {
      const direction =
        design.gradientDirection === "linear-up"
          ? "to top"
          : design.gradientDirection === "linear-down"
          ? "to bottom"
          : "circle";

      baseStyle.background =
        direction === "circle"
          ? `radial-gradient(${design.backgroundColor || "#000000"}, ${
              design.gradientColor || "#666666"
            })`
          : `linear-gradient(${direction}, ${design.backgroundColor || "#000000"}, ${
              design.gradientColor || "#666666"
            })`;
    } else if (design.wallpaperStyle === "blur") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
      baseStyle.backdropFilter = "blur(10px)";
    } else if (design.wallpaperStyle === "pattern") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else if (design.wallpaperStyle === "image") {
      if (design.backgroundImage) {
        baseStyle.backgroundImage = `url(${design.backgroundImage})`;
        baseStyle.backgroundSize = "cover";
        baseStyle.backgroundPosition = "center";
        baseStyle.backgroundRepeat = "no-repeat";
      } else {
        baseStyle.backgroundColor = design.backgroundColor || "#000000";
      }
    } else if (design.wallpaperStyle === "video") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    }

    return baseStyle;
  };

  // Button styles from design manager
  const getButtonStyle = (link) => {
    const baseStyle = {
      backgroundColor:
        design.buttonStyle === "outline" ? "transparent" : design.buttonColor,
      color: design.buttonTextColor,
      border:
        design.buttonStyle === "outline"
          ? `2px solid ${design.buttonColor}`
          : "none",
    };

    const cornerRoundness = {
      square: "0px",
      round: "0.5rem",
      rounder: "1rem",
      full: "9999px",
    };

    baseStyle.borderRadius = cornerRoundness[design.cornerRoundness] || "0.5rem";

    const shadows = {
      none: "none",
      soft: "0 1px 3px rgba(0,0,0,0.1)",
      strong: "0 4px 6px rgba(0,0,0,0.1)",
      hard: "0 10px 15px rgba(0,0,0,0.2)",
    };

    baseStyle.boxShadow = shadows[design.buttonShadow] || "none";

    if (design.buttonStyle === "glass") {
      baseStyle.background = "rgba(255,255,255,0.1)";
      baseStyle.backdropFilter = "blur(10px)";
      baseStyle.border = "1px solid rgba(255,255,255,0.2)";
    }

    return baseStyle;
  };

  // Title styles
  const titleStyle = {
    color: design.titleColor,
    fontSize:
      design.titleSize === "small"
        ? "1.125rem"
        : design.titleSize === "large"
        ? "2rem"
        : "1.5rem",
    fontFamily: design.titleFont || "Inter",
  };

  // Profile image size
  const profileSize =
    design.titleSize === "small"
      ? "w-16 h-16"
      : design.titleSize === "large"
      ? "w-24 h-24"
      : "w-20 h-20";

  return (
    <aside className="w-[360px] bg-white border-l flex justify-center items-center">
      <div
        className="w-[280px] h-[560px] rounded-[30px] p-6 flex flex-col items-center relative overflow-y-auto"
        style={getBackgroundStyle()}
      >
        {/* Background Video Layer */}
        {design.wallpaperStyle === "video" && design.backgroundVideo && (
          <video
            src={design.backgroundVideo}
            className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
            autoPlay
            loop
            muted
            playsInline
          />
        )}

        {/* Pattern Layer */}
        {design.wallpaperStyle === "pattern" && (
          <div className="absolute inset-0 pointer-events-none">
            {design.pattern === "grid" && (
              <div className="w-full h-full grid grid-cols-8 gap-2 p-4 opacity-20">
                {[...Array(64)].map((_, i) => (
                  <div
                    key={i}
                    className="border-2 rounded"
                    style={{ borderColor: design.gradientColor || "#666666" }}
                  />
                ))}
              </div>
            )}
            {design.pattern === "morph" && (
              <div className="w-full h-full flex items-center justify-center opacity-30">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      width: `${100 + i * 50}px`,
                      height: `${100 + i * 50}px`,
                      background: design.gradientColor || "#666666",
                      borderRadius: "40% 60% 70% 30% / 60% 30% 70% 40%",
                      opacity: 0.3 - i * 0.1,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            )}
            {design.pattern === "organic" && (
              <svg
                className="w-full h-full opacity-20"
                viewBox="0 0 280 560"
                fill="none"
              >
                {[...Array(5)].map((_, i) => (
                  <path
                    key={i}
                    d={`M${50 + i * 40},${100 + i * 60} Q${100 + i * 20},${
                      50 + i * 40
                    } ${150 + i * 30},${120 + i * 50} T${200 + i * 20},${
                      200 + i * 70
                    }`}
                    stroke={design.gradientColor || "#666666"}
                    strokeWidth="2"
                    fill="none"
                  />
                ))}
              </svg>
            )}
            {design.pattern === "matrix" && (
              <div
                className="w-full h-full opacity-40"
                style={{
                  background: `repeating-linear-gradient(
                    90deg,
                    ${design.gradientColor || "#666666"} 0px,
                    transparent 1px,
                    transparent 20px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    ${design.gradientColor || "#666666"} 0px,
                    transparent 1px,
                    transparent 20px
                  )`,
                }}
              />
            )}
          </div>
        )}

        {/* Image Effects Layer */}
        {design.wallpaperStyle === "image" && design.backgroundImage && (
          <div className="absolute inset-0 pointer-events-none rounded-[30px] overflow-hidden">
            {design.imageEffect === "mono" && (
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-saturation" />
            )}
            {design.imageEffect === "blur" && (
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))`,
                }}
              />
            )}
            {design.imageEffect === "halftone" && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
                  backgroundSize: "4px 4px",
                  mixBlendMode: "overlay",
                }}
              />
            )}
            {/* Tint overlay */}
            {design.imageTint > 0 && (
              <div
                className="absolute inset-0"
                style={{
                  background: `rgba(0, 0, 0, ${design.imageTint / 100})`,
                }}
              />
            )}
          </div>
        )}

        {/* Noise Layer */}
        {design.noise && (
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Content Layer (above background effects) */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Profile Image */}
          {design.profileLayout === "classic" && (
            <div
              className={`${profileSize} bg-gray-300 rounded-full mb-4 flex-shrink-0 overflow-hidden`}
            >
              {design.profileImage ? (
                <img
                  src={design.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-1/2 h-1/2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}

          {/* Hero Layout */}
          {design.profileLayout === "hero" && design.profileImage && (
            <div className="w-full h-32 mb-4 flex-shrink-0 overflow-hidden rounded-xl relative">
              <img
                src={design.profileImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}

          {/* Title */}
          {design.title && design.titleStyle === "text" && (
            <p className="font-semibold mb-4 text-center" style={titleStyle}>
              {design.title}
            </p>
          )}

          {/* Logo Style Title */}
          {design.title && design.titleStyle === "logo" && design.profileImage && (
            <div className="mb-4 flex items-center gap-3">
              <img
                src={design.profileImage}
                alt="Logo"
                className="w-8 h-8 rounded"
              />
              <p className="font-semibold" style={titleStyle}>
                {design.title}
              </p>
            </div>
          )}

          {/* Links */}
          <div className="w-full flex-1 flex flex-col gap-3 mb-4">
            {activeLinks.length === 0 ? (
              <div className="text-center py-8 opacity-50">
                <p className="text-sm">No active links</p>
                <p className="text-xs mt-1">Add links to see them here</p>
              </div>
            ) : (
              activeLinks.map((link) => {
                if (link.layout === "classic") {
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
                      style={getButtonStyle(link)}
                      onClick={(e) => e.preventDefault()}
                    >
                      {link.thumbnail && (
                        <img
                          src={link.thumbnail}
                          alt={link.name}
                          className="w-6 h-6 rounded"
                        />
                      )}
                      <span>{link.name}</span>
                    </a>
                  );
                }

                if (link.layout === "featured") {
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-xl overflow-hidden transition-transform hover:scale-105"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {link.thumbnail ? (
                        <div className="relative h-32">
                          <img
                            src={link.thumbnail}
                            alt={link.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 left-3 text-white">
                            <p className="font-semibold text-sm">{link.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="relative h-32 flex items-center justify-center"
                          style={{ backgroundColor: design.buttonColor }}
                        >
                          <p
                            className="font-semibold text-sm"
                            style={{ color: design.buttonTextColor }}
                          >
                            {link.name}
                          </p>
                        </div>
                      )}
                    </a>
                  );
                }

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
                    style={getButtonStyle(link)}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })
            )}
          </div>

          {/* Footer */}
          {design.footerText ? (
            <p
              className="text-xs opacity-70 mt-2 text-center"
              style={{ color: design.pageTextColor }}
            >
              {design.footerText}
            </p>
          ) : (
            <>
              <button
                className="mt-auto bg-white px-5 py-2 rounded-full font-medium"
                style={{ color: design.backgroundColor }}
              >
                Join {design.title || "anish"} on Linktree
              </button>

              <p
                className="text-xs opacity-70 mt-3"
                style={{ color: design.pageTextColor }}
              >
                Report • Privacy
              </p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}