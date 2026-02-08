import React from "react";
import {
  User,
  LayoutTemplate,
  LayoutPanelTop,
  Type,
  Image as ImageIcon
} from "lucide-react";

/**
 * Reusable icon option button
 * supports lucide icons OR custom SVG
 */
const IconOption = ({ selected, onClick, icon, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-6 rounded-xl border transition flex flex-col items-center justify-center gap-3
        focus:outline-none focus:ring-2 focus:ring-black
        ${
          selected
            ? "border-black ring-2 ring-black bg-white"
            : "border-gray-300 bg-white hover:bg-gray-50 active:scale-[0.98]"
        }`}
    >
      <div className="p-3 rounded-lg bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const HeaderSection = ({ state, updateDesign }) => {

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateDesign("profileImage", imageUrl);
    }
  };

  return (
    <div className="max-w-3xl w-full">
      
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-8">Header</h1>

      <div className="space-y-10">

        {/* PROFILE IMAGE */}
        <section>
          <p className="text-sm font-semibold mb-4">Profile image</p>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border flex items-center justify-center">
              {state.profileImage ? (
                <img
                  src={state.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} className="text-gray-400" />
              )}
            </div>

            <label className="border border-black px-6 py-2.5 bg-black text-white rounded-full cursor-pointer font-medium hover:bg-gray-800 transition">
              + Add
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {state.profileImage && (
              <button
                onClick={() => updateDesign("profileImage", null)}
                className="border border-gray-300 px-6 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition"
              >
                Remove
              </button>
            )}
          </div>
        </section>

        {/* PROFILE IMAGE LAYOUT */}
        <section>
          <p className="text-sm font-semibold mb-4">Profile image layout</p>

          <div className="grid grid-cols-2 gap-4">
            <IconOption
              selected={state.profileLayout === "classic"}
              onClick={() => updateDesign("profileLayout", "classic")}
              icon={<LayoutTemplate size={22} />}
              label="Classic"
            />

            <IconOption
              selected={state.profileLayout === "hero"}
              onClick={() => updateDesign("profileLayout", "hero")}
              icon={<LayoutPanelTop size={22} />}
              label="Hero"
            />
          </div>
        </section>

        {/* TITLE */}
        <section>
          <p className="text-sm font-semibold mb-4">Title</p>

          <input
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your name"
            value={state.title || ""}
            onChange={(e) => updateDesign("title", e.target.value)}
          />
        </section>

        {/* TITLE STYLE */}
        <section>
          <p className="text-sm font-semibold mb-4">Title style</p>

          <div className="grid grid-cols-2 gap-4">
            <IconOption
              selected={state.titleStyle === "text"}
              onClick={() => updateDesign("titleStyle", "text")}
              icon={<Type size={22} />}
              label="Text"
            />

            {/* LOGO SUPPORTS SVG */}
            <IconOption
              selected={state.titleStyle === "logo"}
              onClick={() => updateDesign("titleStyle", "logo")}
              icon={
                <ImageIcon size={22} />
                // later you can replace with custom svg:
                // <YourLogoSVG />
              }
              label="Logo"
            />
          </div>
        </section>

        {/* SIZE */}
        <section>
          <p className="text-sm font-semibold mb-4">Size</p>

          <div className="grid grid-cols-2 gap-4">
            <IconOption
              selected={state.titleSize === "small"}
              onClick={() => updateDesign("titleSize", "small")}
              icon={<Type size={18} />}
              label="Small"
            />

            <IconOption
              selected={state.titleSize === "large"}
              onClick={() => updateDesign("titleSize", "large")}
              icon={<Type size={26} />}
              label="Large"
            />
          </div>
        </section>

        {/* FONT */}
        <section>
          <p className="text-sm font-semibold mb-4">Title font</p>

          <select
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black focus:outline-none bg-white"
            value={state.titleFont || "Inter"}
            onChange={(e) => updateDesign("titleFont", e.target.value)}
          >
            <option>Inter</option>
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Georgia</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
          </select>
        </section>

        {/* COLOR */}
        <section>
          <p className="text-sm font-semibold mb-4">Title font color</p>

          <div className="flex items-center gap-3">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black bg-white"
              value={state.titleColor || "#000000"}
              onChange={(e) => updateDesign("titleColor", e.target.value)}
            />

            <input
              type="color"
              className="w-12 h-12 rounded-lg border cursor-pointer"
              value={state.titleColor || "#000000"}
              onChange={(e) => updateDesign("titleColor", e.target.value)}
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default HeaderSection;
