import React from "react";

const FooterSection = ({ state, updateDesign }) => {
  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-semibold mb-8">Footer</h1>

      <div className="space-y-8">
        {/* Footer Text */}
        <section>
          <p className="text-sm font-semibold mb-4">Footer text</p>

          <input
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter footer text (e.g., © 2024 Your Name)"
            value={state.footerText || ""}
            onChange={(e) => updateDesign("footerText", e.target.value)}
          />
        </section>
      </div>
    </div>
  );
};

export default FooterSection;