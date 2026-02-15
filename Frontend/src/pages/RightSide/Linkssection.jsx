import React from "react";
import {
  ClassicLinkLayout,
  PillLinkLayout,
  FeaturedLinkLayout,
  FallbackLinkLayout,
} from "./Linklayouts";
import { getButtonStyle } from "./utils";

/**
 * Empty Links Placeholder Component
 */
function EmptyLinksPlaceholder() {
  return (
    <div className="text-center py-8 opacity-50">
      <p className="text-sm">No active links</p>
      <p className="text-xs mt-1">Add links to see them here</p>
    </div>
  );
}

/**
 * Links Section Component
 */
export function LinksSection({ activeLinks, design }) {
  if (activeLinks.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col gap-3 mb-4">
        <EmptyLinksPlaceholder />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col gap-3 mb-4">
      {activeLinks.map((link) => {
        // Classic Layout
        if (link.layout === 'classic') {
          return (
            <ClassicLinkLayout 
              key={link.id} 
              link={link} 
              getButtonStyle={getButtonStyle}
              design={design}
            />
          );
        }

        // Pill Layout
        if (link.layout === 'pill') {
          return (
            <PillLinkLayout 
              key={link.id} 
              link={link} 
              getButtonStyle={getButtonStyle}
              design={design}
            />
          );
        }

        // Featured Layout
        if (link.layout === 'featured') {
          return (
            <FeaturedLinkLayout 
              key={link.id} 
              link={link} 
              design={design}
            />
          );
        }

        // Fallback
        return (
          <FallbackLinkLayout 
            key={link.id} 
            link={link} 
            getButtonStyle={getButtonStyle}
            design={design}
          />
        );
      })}
    </div>
  );
}