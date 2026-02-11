import React from "react";
import { Link as LinkIcon } from 'lucide-react';
import { getCroppedImageStyle, getAutoIcon } from "./utils";

/**
 * Classic Link Layout Component
 */
export function ClassicLinkLayout({ link, getButtonStyle, design }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
      style={getButtonStyle(design)}
      onClick={(e) => e.preventDefault()}
    >
      {link.thumbnail && (
        <div className="w-6 h-6 rounded overflow-hidden">
          <img
            src={link.thumbnail}
            alt={link.name}
            className="w-full h-full object-cover"
            style={getCroppedImageStyle(link.thumbnailCrop)}
          />
        </div>
      )}
      <span>{link.name}</span>
    </a>
  );
}

/**
 * Pill Link Layout Component
 */
export function PillLinkLayout({ link, getButtonStyle, design }) {
  const pillPosition = link.pillPosition || 'left';
  const iconType = link.iconType || 'thumbnail';
  const autoIcon = iconType === 'auto' ? getAutoIcon(link.url) : null;

  const IconContent = () => (
    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
      {link.thumbnail ? (
        <div className="w-full h-full relative overflow-hidden">
          <img 
            src={link.thumbnail} 
            alt=""
            className="w-full h-full object-cover"
            style={getCroppedImageStyle(link.thumbnailCrop)}
          />
        </div>
      ) : autoIcon ? (
        <img 
          src={autoIcon} 
          alt=""
          className="w-6 h-6"
        />
      ) : (
        <LinkIcon className="w-5 h-5" style={{ color: design.buttonTextColor || '#ffffff' }} />
      )}
    </div>
  );

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full rounded-full overflow-hidden transition-transform hover:scale-105"
      style={{
        ...getButtonStyle(design),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        minHeight: '3.5rem'
      }}
      onClick={(e) => e.preventDefault()}
    >
      {pillPosition === 'left' ? (
        <>
          <div className="flex items-center gap-3">
            <IconContent />
            <span className="font-medium">{link.name}</span>
          </div>
          <div className="text-xl">⋯</div>
        </>
      ) : (
        <>
          <div className="text-xl">⋯</div>
          <div className="flex items-center gap-3">
            <span className="font-medium">{link.name}</span>
            <IconContent />
          </div>
        </>
      )}
    </a>
  );
}

/**
 * Featured Link Layout Component
 */
export function FeaturedLinkLayout({ link, design }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full rounded-xl overflow-hidden transition-transform hover:scale-105"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      onClick={(e) => e.preventDefault()}
    >
      {link.thumbnail ? (
        <div className="relative h-32">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={link.thumbnail}
              alt={link.name}
              className="w-full h-full object-cover"
              style={getCroppedImageStyle(link.thumbnailCrop)}
            />
          </div>
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

/**
 * Fallback Link Layout Component
 */
export function FallbackLinkLayout({ link, getButtonStyle, design }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full px-4 py-3 text-center font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
      style={getButtonStyle(design)}
      onClick={(e) => e.preventDefault()}
    >
      <span>{link.name}</span>
    </a>
  );
}