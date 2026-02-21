import React from "react";
import OptionButton from "./OptionButton";
import { TextStyleIcon, LogoStyleIcon } from "./Icons";
import ProWrapper from "../../../../../../wrapper/ProGate";

const TitleStyleSection = ({ state, updateDesign }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-4">
        Title style
      </label>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col items-center">
          <OptionButton
            selected={state.titleStyle === "text"}
            onClick={() => updateDesign("titleStyle", "text")}
            icon={<TextStyleIcon />}
            isPro={false}
          />
          <span className="mt-3 text-sm font-medium">Text</span>
        </div>

        <div className="flex flex-col items-center">
          <ProWrapper label="logo">
          <OptionButton
            selected={state.titleStyle === "logo"}
            onClick={() => updateDesign("titleStyle", "logo")}
            icon={<LogoStyleIcon />}
            isPro={true}
          />
          </ProWrapper>
          <span className="mt-3 text-sm font-medium">Logo</span>
        </div>
      </div>
    </section>
  );
};

export default TitleStyleSection;