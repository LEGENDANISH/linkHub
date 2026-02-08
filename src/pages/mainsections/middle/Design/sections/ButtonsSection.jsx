import React from "react";

const ButtonsSection = ({ state, setState }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Buttons</h1>

      <input
        type="color"
        value={state.buttonColor || "#E058D6"}
        onChange={(e) =>
          setState(prev => ({ ...prev, buttonColor: e.target.value }))
        }
      />

      <input
        type="color"
        value={state.buttonTextColor || "#000000"}
        onChange={(e) =>
          setState(prev => ({ ...prev, buttonTextColor: e.target.value }))
        }
      />
    </div>
  );
};

export default ButtonsSection;
