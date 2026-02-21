import React from "react";
import OptionButton from "./OptionButton";
import { SmallSizeIcon, LargeSizeIcon } from "./Icons";
import ProWrapper from "../../../../../../wrapper/ProGate";

const TitleSizeSection = ({ state, updateDesign }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Size</label>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col items-center">
          <OptionButton
            selected={state.titleSize === "small"}
            onClick={() => updateDesign("titleSize", "small")}
            icon={<SmallSizeIcon />}
            isPro={false}
          />
          <span className="mt-3 text-sm font-medium">Small</span>
        </div>

        <div className="flex flex-col items-center">
          <ProWrapper label="large size">
          <OptionButton
            selected={state.titleSize === "large"}
            onClick={() => updateDesign("titleSize", "large")}
            icon={<LargeSizeIcon />}
            isPro={true}
          />
          </ProWrapper>
          <span className="mt-3 text-sm font-medium">Large</span>
        </div>
      </div>
    </section>
  );
};

export default TitleSizeSection;