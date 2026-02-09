import React from "react";
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager";
import { useSelection } from "../mainsections/middle/links/Selectionmanager";

export default function MobilePreview() {
  const { design } = useDesign();
  const { getActiveLinks } = useSelection();

  // Active links from Zustand
  const activeLinks = getActiveLinks() || [];

  // Phone container styles from design manager
  const phoneStyle = {
    backgroundColor: design.backgroundColor,
    color: design.pageTextColor,
  };

  // Button styles from design manager
  const getButtonStyle = (link) => {
    // Base button style
    const baseStyle = {
      backgroundColor: design.buttonStyle === "outline" ? "transparent" : design.buttonColor,
      color: design.buttonTextColor,
      border: design.buttonStyle === "outline" ? `2px solid ${design.buttonColor}` : "none",
    };

    // Corner roundness from ButtonsSection
    const cornerRoundness = {
      square: "0px",
      round: "0.5rem",
      rounder: "1rem",
      full: "9999px",
    };

    baseStyle.borderRadius = cornerRoundness[design.cornerRoundness] || "0.5rem";

    // Shadow from ButtonsSection
    const shadows = {
      none: "none",
      soft: "0 1px 3px rgba(0,0,0,0.1)",
      strong: "0 4px 6px rgba(0,0,0,0.1)",
      hard: "0 10px 15px rgba(0,0,0,0.2)",
    };

    baseStyle.boxShadow = shadows[design.buttonShadow] || "none";

    // Glass effect if applicable
    if (design.buttonStyle === "glass") {
      baseStyle.background = "rgba(255,255,255,0.1)";
      baseStyle.backdropFilter = "blur(10px)";
      baseStyle.border = "1px solid rgba(255,255,255,0.2)";
    }

    return baseStyle;
  };

  // Title styles from design manager
  const titleStyle = {
    color: design.titleColor,
    fontSize: design.titleSize === "small" ? "1.125rem" : design.titleSize === "large" ? "2rem" : "1.5rem",
    fontFamily: design.titleFont || "Inter",
  };

  // Profile image size based on titleSize
  const profileSize = design.titleSize === "small" ? "w-16 h-16" : design.titleSize === "large" ? "w-24 h-24" : "w-20 h-20";

  return (
    <aside className="w-[360px] bg-white border-l flex justify-center items-center">
      <div
        className="w-[280px] h-[560px] rounded-[30px] p-6 flex flex-col items-center relative overflow-y-auto"
        style={phoneStyle}
      >
        {/* Profile Image */}
        {design.profileLayout === "classic" && (
          <div className={`${profileSize} bg-gray-300 rounded-full mb-4 flex-shrink-0 overflow-hidden`}>
            {design.profileImage ? (
              <img
                src={design.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
            <img src={design.profileImage} alt="Logo" className="w-8 h-8 rounded" />
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
              // Classic Layout
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

              // Featured Layout
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
                        <p className="font-semibold text-sm" style={{ color: design.buttonTextColor }}>
                          {link.name}
                        </p>
                      </div>
                    )}
                  </a>
                );
              }

              // Default fallback to classic
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
          <p className="text-xs opacity-70 mt-2 text-center" style={{ color: design.pageTextColor }}>
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

            <p className="text-xs opacity-70 mt-3" style={{ color: design.pageTextColor }}>
              Report • Privacy
            </p>
          </>
        )}
      </div>
    </aside>
  );
}