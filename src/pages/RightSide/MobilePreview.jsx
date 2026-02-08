import React from "react";
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager";
import { useSelection } from "../mainsections/middle/links/Selectionmanager";

export default function MobilePreview() {
  const { design } = useDesign();
  const { getActiveLinks } = useSelection();

  // Active links
  const activeLinks = getActiveLinks() || [];

  // Phone styles
  const phoneStyle = {
    backgroundColor: design.backgroundColor,
    color: design.pageTextColor,
  };

  const buttonStyle = {
    backgroundColor: design.buttonColor,
    color: design.buttonTextColor,
    borderRadius:
      design.buttonStyle === "rounded"
        ? "9999px"
        : design.buttonStyle === "square"
        ? "0px"
        : "8px",
    boxShadow: design.buttonShadow
      ? "0 4px 6px rgba(0,0,0,0.1)"
      : "none",
  };

  const titleStyle = {
    color: design.titleColor,
    fontSize:
      design.titleSize === "small"
        ? "1.125rem"
        : design.titleSize === "medium"
        ? "1.5rem"
        : "2rem",
    fontFamily: design.titleFont || "Inter",
  };

  return (
    <aside className="w-[360px] bg-white border-l flex justify-center items-center">
      <div
        className="w-[280px] h-[560px] rounded-[30px] p-6 flex flex-col items-center relative overflow-y-auto"
        style={phoneStyle}
      >
        {/* Profile Image */}
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex-shrink-0 overflow-hidden">
          {design.profileImage ? (
            <img
              src={design.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>

        {/* Title */}
        {design.title && (
          <p className="font-semibold mb-4 text-center" style={titleStyle}>
            {design.title}
          </p>
        )}

        {/* Links */}
        <div className="w-full flex-1 flex flex-col gap-3 mb-4">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
              style={buttonStyle}
              onClick={(e) => e.preventDefault()} // prevent navigation
            >
              {link.layout === "thumbnail" && link.thumbnail && (
                <img
                  src={link.thumbnail}
                  alt={link.name}
                  className="w-8 h-8 rounded"
                />
              )}

              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Custom footer */}
        {design.footerText ? (
          <p className="text-xs opacity-70 mt-2 text-center">
            {design.footerText}
          </p>
        ) : (
          <>
            <button
              className="mt-auto bg-white px-5 py-2 rounded-full font-medium"
              style={{ color: design.backgroundColor }}
            >
              Join {design.title || "05anish"} on Linktree
            </button>

            <p className="text-xs opacity-70 mt-3">
              Report • Privacy
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
