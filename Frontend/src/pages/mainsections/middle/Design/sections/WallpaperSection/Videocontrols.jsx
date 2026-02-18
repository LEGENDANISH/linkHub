import React from "react";
import axios from "axios";

const VideoControls = ({ design, updateDesign }) => {

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Video is too large (max 5MB). Please use a smaller video.");
      return;
    }

    // 🔹 instant preview (same UX as current)
    const previewUrl = URL.createObjectURL(file);
    updateDesign("backgroundVideo", previewUrl);

    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("backgroundVideo", file); // must match multer field

      const res = await axios.post(
        "http://localhost:5000/api/upload/background-video",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const videoUrl = res?.data?.data?.url;

      if (!videoUrl) {
        throw new Error("No video URL returned");
      }

      // 🔹 replace preview with real S3 URL
      updateDesign("backgroundVideo", videoUrl);

    } catch (err) {
      console.error("Video upload error:", err);
      alert("Video upload failed");

      // revert preview if upload failed
      updateDesign("backgroundVideo", null);
    }
  };

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Background video</label>
      <div className="flex flex-col gap-4">
        {design.backgroundVideo && (
          <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200">
            <video
              src={design.backgroundVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="flex-1 border-2 border-gray-300 px-5 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            {design.backgroundVideo ? "Change Video" : "Upload Video"}
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </label>

          {design.backgroundVideo && (
            <button
              type="button"
              onClick={() => updateDesign("backgroundVideo", null)}
              className="border-2 border-red-300 px-5 py-2.5 bg-white text-red-600 rounded-full cursor-pointer font-medium hover:bg-red-50 transition-colors text-sm sm:text-base"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoControls;
