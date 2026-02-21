import React from "react";
import OptionButton from "./OptionButton";
import { ClassicLayoutIcon, HeroLayoutIcon } from "./Icons";
import ProWrapper from "../../../../../../wrapper/ProGate";

const ProfileLayoutSection = ({ state, updateDesign }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-4">
        Profile image layout
      </label>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col items-center">
          <OptionButton
            selected={state.profileLayout === "classic"}
            onClick={() => updateDesign("profileLayout", "classic")}
            icon={<ClassicLayoutIcon />}
            isPro={false}
          />
          <span className="mt-2 text-sm font-medium">Classic</span>
        </div>

        <div className="flex flex-col items-center">
          <ProWrapper label="hero">
          <OptionButton
            selected={state.profileLayout === "hero"}
            onClick={() => updateDesign("profileLayout", "hero")}
            icon={<HeroLayoutIcon />}
            isPro={true}
          />
          </ProWrapper>
          <span className="mt-2 text-sm font-medium">Hero</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayoutSection;