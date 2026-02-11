import React from "react";

export function LinksSection({ activeLinks, design, getButtonStyle }) {
  if (activeLinks.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col gap-3 mb-4">
        <div className="text-center py-8 opacity-50">
          <p className="text-sm">No active links</p>
          <p className="text-xs mt-1">Add links to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col gap-3 mb-4">
      {activeLinks.map((link) => {
        if (link.layout === "classic") {
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
              style={getButtonStyle(design, link)}
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
                  style={{ backgroundColor: design.buttonColor || "#000000" }}
                >
                  <p
                    className="font-semibold text-sm"
                    style={{ color: design.buttonTextColor || "#ffffff" }}
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
            style={getButtonStyle(design, link)}
            onClick={(e) => e.preventDefault()}
          >
            <span>{link.name}</span>
          </a>
        );
      })}
    </div>
  );
}