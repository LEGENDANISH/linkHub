import React from "react";
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager";
import { useSelection } from "../mainsections/middle/links/Selectionmanager";
import { useVideoPlayback, useBackgroundStyle, useDesignDebug } from "./hooks";
import { getTitleStyle, getProfileSizeClass } from "./utils";
import {
  BackgroundVideoLayer,
  BlurEffectLayer,
  PatternLayer,
  ImageEffectsLayer,
  NoiseLayer,
} from "./BackgroundLayers";
import {
  ClassicProfile,
  HeroProfile,
  TextTitle,
  LogoTitle,
} from "./ProfileSection";
import { LinksSection } from "./LinksSection";
import { FooterSection } from "./FooterSection";

export default function MobilePreview() {
  const { design } = useDesign();
  const { getActiveLinks } = useSelection();

  // Active links from Zustand
  const activeLinks = getActiveLinks() || [];

  // Custom hooks
  useDesignDebug(design);
  const videoRef = useVideoPlayback(design);
  const backgroundStyle = useBackgroundStyle(design);

  // Computed styles
  const titleStyle = getTitleStyle(design);
  const profileSize = getProfileSizeClass(design);

  return (
    <aside className="w-[360px] bg-white border-l flex justify-center items-center">
      <div
        className="w-[280px] h-[560px] rounded-[30px] p-6 flex flex-col items-center relative overflow-hidden"
        style={backgroundStyle}
        key={`preview-${design.wallpaperStyle}-${design.backgroundColor}`}
      >
        {/* Background Layers */}
        <BackgroundVideoLayer design={design} videoRef={videoRef} />
        <BlurEffectLayer design={design} />
        <PatternLayer design={design} />
        <ImageEffectsLayer design={design} />
        <NoiseLayer design={design} />

        {/* Content Layer (above background effects) */}
        <div className="relative z-10 flex flex-col items-center w-full h-full overflow-y-auto scrollbar-hide">
          {/* Profile Section */}
          <ClassicProfile design={design} profileSize={profileSize} />
          <HeroProfile design={design} />

          {/* Title Section */}
          <TextTitle design={design} titleStyle={titleStyle} />
          <LogoTitle design={design} titleStyle={titleStyle} />

          {/* Links Section */}
          <LinksSection activeLinks={activeLinks} design={design} />

          {/* Footer Section */}
          <FooterSection design={design} />
        </div>

        {/* Hide scrollbar with CSS */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>  
    </aside>
  );
}