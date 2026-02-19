import React from "react";

const TitleInputSection = ({ state, updateDesign }) => {
  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Title</label>

      <input
        className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Enter your name"
       value={state.titleText || ""}
onChange={(e) => updateDesign("titleText", e.target.value)}

      />
    </section>
  );
};

export default TitleInputSection;