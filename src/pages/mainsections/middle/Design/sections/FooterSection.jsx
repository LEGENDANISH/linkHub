import React from "react";

const FooterSection = ({ state, setState }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Footer</h1>

      <input
        placeholder="Footer text"
        value={state.footerText || ""}
        onChange={(e) =>
          setState(prev => ({ ...prev, footerText: e.target.value }))
        }
        className="border rounded-lg p-3 w-full"
      />
    </div>
  );
};

export default FooterSection;
