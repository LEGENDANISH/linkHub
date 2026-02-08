import React from "react";

const TextSection = ({ state, setState }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Text</h1>

      <input
        placeholder="Page text color"
        type="color"
        value={state.pageTextColor || "#ffffff"}
        onChange={(e) =>
          setState(prev => ({ ...prev, pageTextColor: e.target.value }))
        }
      />
    </div>
  );
};

export default TextSection;
