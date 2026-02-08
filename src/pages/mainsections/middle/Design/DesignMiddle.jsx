import React, { useState, useEffect } from "react";
import DesignSidebar from "./DesignSidebar";

import HeaderSection from "./sections/HeaderSection";
import ThemeSection from "./sections/ThemeSection";
import WallpaperSection from "./sections/WallpaperSection";
import TextSection from "./sections/TextSection";
import ButtonsSection from "./sections/ButtonsSection";
import ColorsSection from "./sections/ColorsSection";
import FooterSection from "./sections/FooterSection";

import { useDesign } from "./DesignSelectionManager";

const DesignMiddle = () => {
  const [activeTab, setActiveTab] = useState("header");
const { design, updateDesign } = useDesign();

  const [designState, setDesignState] = useState(() => {
    const saved = localStorage.getItem("linkhub_design");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("linkhub_design", JSON.stringify(designState));
    updateDesign(designState);
  }, [designState]);

  const renderSection = () => {
    switch (activeTab) {
      case "header":
        return <HeaderSection state={designState} setState={setDesignState} />;
      case "theme":
        return <ThemeSection state={designState} setState={setDesignState} />;
      case "wallpaper":
        return <WallpaperSection state={designState} setState={setDesignState} />;
      case "text":
        return <TextSection state={designState} setState={setDesignState} />;
      case "buttons":
        return <ButtonsSection state={designState} setState={setDesignState} />;
      case "colors":
        return <ColorsSection state={designState} setState={setDesignState} />;
      case "footer":
        return <FooterSection state={designState} setState={setDesignState} />;
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
      <div className="flex-1 p-10 overflow-y-auto mt-6">
        {renderSection()}
      </div>

    </div>
  </div>
);

};

export default DesignMiddle;
