import React from "react";
import {
  Image as ImageIcon,
  User,
  Layout,
  Type,
  Palette
} from "lucide-react";

const HeaderSection = ({ state, setState }) => {

  const update = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-semibold mb-10">Header</h1>

      <div className="space-y-12">

        {/* PROFILE IMAGE */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={18} />
            <p className="text-sm font-medium">Profile image</p>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border flex items-center justify-center">
              {state.profileImage ? (
                <img
                  src={state.profileImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} className="text-gray-400" />
              )}
            </div>

            <label className="bg-black hover:bg-gray-900 transition text-white px-6 py-2.5 rounded-full cursor-pointer font-medium">
              + Add
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  update("profileImage", URL.createObjectURL(e.target.files[0]))
                }
              />
            </label>
          </div>
        </section>

        {/* PROFILE LAYOUT */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layout size={18} />
            <p className="text-sm font-medium">Profile image layout</p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div
              onClick={() => update("profileLayout", "classic")}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                state.profileLayout === "classic"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Classic</p>
            </div>

            <div
              onClick={() => update("profileLayout", "hero")}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                state.profileLayout === "hero"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Hero</p>
            </div>

          </div>
        </section>

        {/* TITLE */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type size={18} />
            <p className="text-sm font-medium">Title</p>
          </div>

          <input
            className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your display name"
            value={state.title || ""}
            onChange={(e) => update("title", e.target.value)}
          />
        </section>

        {/* TITLE STYLE */}
        <section>
          <p className="text-sm font-medium mb-4">Title style</p>

          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => update("titleStyle", "text")}
              className={`p-6 rounded-2xl border cursor-pointer transition ${
                state.titleStyle === "text"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Text</p>
            </div>

            <div
              onClick={() => update("titleStyle", "logo")}
              className={`p-6 rounded-2xl border cursor-pointer transition ${
                state.titleStyle === "logo"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Logo</p>
            </div>
          </div>
        </section>

        {/* SIZE */}
        <section>
          <p className="text-sm font-medium mb-4">Size</p>

          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => update("titleSize", "small")}
              className={`p-6 rounded-2xl border cursor-pointer transition ${
                state.titleSize === "small"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Small</p>
            </div>

            <div
              onClick={() => update("titleSize", "large")}
              className={`p-6 rounded-2xl border cursor-pointer transition ${
                state.titleSize === "large"
                  ? "border-black bg-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-center font-medium">Large</p>
            </div>
          </div>
        </section>

        {/* FONT */}
        <section>
          <p className="text-sm font-medium mb-4">Title font</p>

          <select
            className="w-full border rounded-2xl p-4 focus:ring-2 focus:ring-black"
            value={state.titleFont || "Inter"}
            onChange={(e) => update("titleFont", e.target.value)}
          >
            <option>Inter</option>
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Montserrat</option>
            <option>Open Sans</option>
          </select>
        </section>

        {/* COLOR */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette size={18} />
            <p className="text-sm font-medium">Title font color</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="flex-1 border rounded-2xl p-4 focus:ring-2 focus:ring-black"
              value={state.titleColor || "#000000"}
              onChange={(e) => update("titleColor", e.target.value)}
            />

            <input
              type="color"
              className="w-12 h-12 rounded-lg border cursor-pointer"
              value={state.titleColor || "#000000"}
              onChange={(e) => update("titleColor", e.target.value)}
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default HeaderSection;
