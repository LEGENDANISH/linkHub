import React from "react";
import ProfileImageSection from "./Profileimagesection";
import ProfileLayoutSection from "./Profilelayoutsection";
import TitleInputSection from "./Titleinputsection";
import TitleStyleSection from "./Titlestylesection";
import TitleSizeSection from "./Titlesizesection";
import TitleFontSection from "./Titlefontsection";
import TitleColorSection from "./Titlecolorsection";

const HeaderSection = ({ state, updateDesign }) => {
  return (
    <div className="max-w-3xl bg-[#FBFAF9] w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Header</h1>

      <div className="space-y-8 sm:space-y-10">
        {/* Profile Image */}
        <ProfileImageSection state={state} updateDesign={updateDesign} />

        {/* Profile Image Layout */}
        <ProfileLayoutSection state={state} updateDesign={updateDesign} />

        {/* Title Input */}
        <TitleInputSection state={state} updateDesign={updateDesign} />

        {/* Title Style */}
        <TitleStyleSection state={state} updateDesign={updateDesign} />

        {/* Title Size */}
        <TitleSizeSection state={state} updateDesign={updateDesign} />

        {/* Title Font */}
        <TitleFontSection state={state} updateDesign={updateDesign} />

        {/* Title Color */}
        <TitleColorSection state={state} updateDesign={updateDesign} />
      </div>
    </div>
  );
};

export default HeaderSection;