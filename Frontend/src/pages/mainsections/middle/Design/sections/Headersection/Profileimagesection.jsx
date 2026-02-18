import React from "react";
import { User } from "lucide-react";
import axios from "axios";

const ProfileImageSection = ({ state, updateDesign }) => {

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // size validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    // 🔹 instant preview (same UX as before)
    const previewUrl = URL.createObjectURL(file);
    updateDesign("profileImage", previewUrl);

    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("profileImage", file); // must match multer field

      const res = await axios.post(
        "http://localhost:5000/api/upload/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = res?.data?.data?.url;

      if (!imageUrl) {
        throw new Error("No image URL returned");
      }

      // 🔹 replace preview with real S3 URL
      updateDesign("profileImage", imageUrl);

    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed");

      // revert preview if upload failed
      updateDesign("profileImage", null);
    }
  };

  return (
    <section>
      <label className="block text-sm font-semibold mb-4">Profile image</label>

      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
        <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
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

        <label className="border-2 border-black px-5 sm:px-6 py-2.5 bg-black text-white rounded-full cursor-pointer font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
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
            className="border-2 border-gray-300 px-5 sm:px-6 py-2.5 bg-white text-gray-700 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Remove
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileImageSection;
