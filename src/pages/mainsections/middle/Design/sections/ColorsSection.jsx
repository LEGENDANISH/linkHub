import React from "react";

const ColorsSection = ({ state, setState }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Colors</h1>

      <input
        type="color"
        value={state.backgroundColor || "#7F2AEB"}
        onChange={(e) =>
          setState(prev => ({ ...prev, backgroundColor: e.target.value }))
        }
      />
    </div>
  );
};

export default ColorsSection;
