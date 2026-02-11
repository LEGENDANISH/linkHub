import React from "react";

/**
 * Classic Profile Layout Component
 */
export function ClassicProfile({ design, profileSize }) {
  if (design.profileLayout !== "classic") {
    return null;
  }

  return (
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
  );
}

/**
 * Hero Profile Layout Component
 */
export function HeroProfile({ design }) {
  if (design.profileLayout !== "hero" || !design.profileImage) {
    return null;
  }

  return (
    <div className="w-full h-32 mb-4 flex-shrink-0 overflow-hidden rounded-xl relative">
      <img
        src={design.profileImage}
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

/**
 * Text Title Component
 */
export function TextTitle({ design, titleStyle }) {
  if (!design.title || design.titleStyle !== "text") {
    return null;
  }

  return (
    <p className="font-semibold mb-4 text-center" style={titleStyle}>
      {design.title}
    </p>
  );
}

/**
 * Logo Title Component
 */
export function LogoTitle({ design, titleStyle }) {
  if (!design.title || design.titleStyle !== "logo" || !design.profileImage) {
    return null;
  }

  return (
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
  );
}