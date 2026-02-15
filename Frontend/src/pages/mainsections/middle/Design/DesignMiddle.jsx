  import React, { useState } from "react";
  import DesignSidebar from "./DesignSidebar";

  import HeaderSection from "./sections/Headersection/HeaderSection";
  import ThemeSection from "./sections/ThemeSection/ThemeSection";
  import WallpaperSection from "./sections/WallpaperSection/WallpaperSection";
  import TextSection from "./sections/TextSection/TextSection";
  import ButtonsSection from "./sections/Buttonsection/ButtonsSection";
  import ColorsSection from "./sections/ColorsSection";
  import FooterSection from "./sections/FooterSection";

  import { useDesign } from "./DesignSelectionManager";

  const DesignMiddle = () => {
    const [activeTab, setActiveTab] = useState("header");
    const { design, updateDesign, updateDesignBatch } = useDesign();

    const renderSection = () => {
      // Props for sections that haven't been converted yet
      const sectionProps = {
        state: design,
        updateDesign,
        updateDesignBatch,
      };

      switch (activeTab) {
        case "header":
          return <HeaderSection {...sectionProps} />;
        case "theme":
          return <ThemeSection {...sectionProps} />;
        case "wallpaper":
          // ✅ WallpaperSection uses Zustand directly - no props!
          return <WallpaperSection />;
        case "text":
          return <TextSection {...sectionProps} />;
        case "buttons":
          return <ButtonsSection {...sectionProps} />;
        case "colors":
          return <ColorsSection {...sectionProps} />;
        case "footer":
          return <FooterSection {...sectionProps} />;
        default:
          return null;
      }
    };

    return (
      <div className="flex flex-1 p-2 bg-[#f5f6f8] flex-col">
        {/* TOP HEADER — full width border */}
        <div className="px-6 py-5 border-b-2 border-[#f1f0efdf] bg-[#F3F4F6]">
          <h2 className="font-semibold text-lg">Design</h2>
        </div>

        {/* MAIN AREA */}
        <div className="flex flex-1 overflow-auto">
          {/* LEFT SIDEBAR */}
          <div className="w-64 bg-[#F3F4F6] border-r border-gray-200 mt-5">
            <DesignSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 p-10 overflow-y-auto mt-6">{renderSection()}</div>
        </div>
      </div>
    );
  };

  export default DesignMiddle;