import React, { useEffect, useRef, useMemo } from "react";
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager";
import { useSelection } from "../mainsections/middle/links/Selectionmanager";
import { useBackgroundStyle } from "./useBackgroundStyle";
import { getButtonStyle } from "./buttonStyles";
import { BackgroundLayers } from "./BackgroundLayers";
import { ProfileSection } from "./ProfileSection";
import { LinksSection } from "./LinksSection";
import { FooterSection } from "./FooterSection";

export default function MobilePreview() {
  const { design } = useDesign();
  const { getActiveLinks } = useSelection();
  const videoRef = useRef(null);

  // Active links from Zustand
  const activeLinks = getActiveLinks() || [];

  // Get background style from custom hook
  const backgroundStyle = useBackgroundStyle(design);

  // Debug log - see what's updating
  useEffect(() => {
    console.log("🎨 Design updated in preview:", {
      wallpaperStyle: design.wallpaperStyle,
      backgroundColor: design.backgroundColor,
      gradientColor: design.gradientColor,
      gradientDirection: design.gradientDirection,
      pattern: design.pattern,
      noise: design.noise,
    });
  }, [design]);

  // Ensure video plays when updated
  useEffect(() => {
    if (videoRef.current && design.backgroundVideo) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, [design.backgroundVideo]);

  // Title styles
  const titleStyle = useMemo(() => ({
    color: design.titleColor || "#ffffff",
    fontSize:
      design.titleSize === "small"
        ? "1.125rem"
        : design.titleSize === "large"
        ? "2rem"
        : "1.5rem",
    fontFamily: design.titleFont || "Inter",
  }), [design.titleColor, design.titleSize, design.titleFont]);

  // Profile image size
  const profileSize = useMemo(() => 
    design.titleSize === "small"
      ? "w-16 h-16"
      : design.titleSize === "large"
      ? "w-24 h-24"
      : "w-20 h-20"
  , [design.titleSize]);

  return (
    <aside className="w-[360px] bg-white border-l flex justify-center items-center">
      <div
        className="w-[280px] h-[560px] rounded-[30px] p-6 flex flex-col items-center relative overflow-hidden"
        style={backgroundStyle}
        key={`preview-${design.wallpaperStyle}-${design.backgroundColor}`}
      >
        {/* Background Effects Layers */}
        <BackgroundLayers design={design} videoRef={videoRef} />

        {/* Content Layer (above background effects) */}
        <div className="relative z-10 flex flex-col items-center w-full h-full overflow-y-auto">
          {/* Profile and Title Section */}
          <ProfileSection 
            design={design} 
            titleStyle={titleStyle} 
            profileSize={profileSize} 
          />

          {/* Links Section */}
          <LinksSection 
            activeLinks={activeLinks} 
            design={design} 
            getButtonStyle={getButtonStyle} 
          />

          {/* Footer Section */}
          <FooterSection design={design} />
        </div>
      </div>  
    </aside>
  );
}