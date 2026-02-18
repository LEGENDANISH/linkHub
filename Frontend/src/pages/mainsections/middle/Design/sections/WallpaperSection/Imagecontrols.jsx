import React from "react";
import axios from "axios";
import EffectOption from "./EffectOption";

const ImageControls = ({ design, updateDesign }) => {

  // Upload image to S3 backend
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large (max 5MB).");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("backgroundImage", file); // IMPORTANT: must match multer field name

      const res = await axios.post(
        "http://localhost:5000/api/upload/background-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

const imageUrl = res.data.data.url;

      // update design state
      updateDesign("backgroundImage", imageUrl);

      // save draft locally
      const existingDraft = JSON.parse(localStorage.getItem("designDraft") || "{}");
      const updatedDraft = { ...existingDraft, backgroundImage: imageUrl };
      localStorage.setItem("designDraft", JSON.stringify(updatedDraft));

    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed");
    }
  };

  const handleRemoveImage = () => {
    updateDesign("backgroundImage", null);

    const existingDraft = JSON.parse(localStorage.getItem("designDraft") || "{}");
    delete existingDraft.backgroundImage;
    localStorage.setItem("designDraft", JSON.stringify(existingDraft));
  };

  return (
    <>
      {/* Background Image */}
      <section>
        <label className="block text-sm font-semibold mb-4">Background image</label>

        <div className="flex flex-col gap-4">

          {design.backgroundImage && (
            <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
              <img
                src={design.backgroundImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-3">

            <label className="flex-1 border-2 border-gray-300 px-5 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              {design.backgroundImage ? "Change Image" : "Upload Image"}

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {design.backgroundImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="border-2 border-red-300 px-5 py-2.5 bg-white text-red-600 rounded-full cursor-pointer font-medium hover:bg-red-50 transition-colors text-sm sm:text-base"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Effect */}
      <section>
        <label className="block text-sm font-semibold mb-4">Effect</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <EffectOption
            value="none"
            label="None"
            isSelected={design.imageEffect === "none"}
            onClick={() => updateDesign("imageEffect", "none")}
          />
          <EffectOption
            value="mono"
            label="Mono"
            isSelected={design.imageEffect === "mono"}
            onClick={() => updateDesign("imageEffect", "mono")}
          />
          <EffectOption
            value="blur"
            label="Blur"
            isSelected={design.imageEffect === "blur"}
            onClick={() => updateDesign("imageEffect", "blur")}
          />
          <EffectOption
            value="halftone"
            label="Halftone"
            isSelected={design.imageEffect === "halftone"}
            onClick={() => updateDesign("imageEffect", "halftone")}
          />
        </div>
      </section>

      {/* Tint */}
      <section>
        <label className="block text-sm font-semibold mb-2">Tint</label>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={design.imageTint || 0}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateDesign("imageTint", value);

              const existingDraft = JSON.parse(localStorage.getItem("designDraft") || "{}");
              localStorage.setItem(
                "designDraft",
                JSON.stringify({ ...existingDraft, imageTint: value })
              );
            }}
            className="flex-1"
          />

          <span className="text-sm font-medium w-12 text-right">
            {design.imageTint || 0}%
          </span>
        </div>
      </section>
    </>
  );
};

export default ImageControls;
