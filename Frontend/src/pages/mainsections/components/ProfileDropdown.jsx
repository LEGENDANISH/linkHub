import React, { useState, useRef, useEffect } from "react";
import { User, ArrowLeftRight, Plus, UserCircle, Zap, HelpCircle, BookOpen, MessageSquare, LogOut } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const ref = useRef();

  // fetch profile (slug, image etc.)
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/me/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      const data = await res.json();

      if (data.success) {
        const profileData = data.data;

        // capitalize slug here
        const capitalizedSlug =
          profileData.slug?.charAt(0).toUpperCase() +
          profileData.slug?.slice(1);

        setProfile({
          ...profileData,
          slug: capitalizedSlug
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  fetchProfile();
}, []);


  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const displayName = profile?.user?.name || "Loading...";
console.log(displayName)
const slug = profile?.slug;
  const profileImage = profile?.profileImage;


  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Name */}
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-800">{displayName}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-gray-500 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-14 left-0 w-[300px] bg-white rounded-3xl shadow-2xl border border-gray-200 py-3 z-50">

          {/* Profile header */}
          <div className="flex items-center justify-between px-5 py-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base">  {displayName}</p>
                <p className="text-sm text-gray-500">
                  linktr.ee/{displayName  }
                </p>
              </div>
            </div>

            <span className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
              Free
            </span>
          </div>

          {/* menu items */}
          <div className="py-1">
            <MenuItem icon={<ArrowLeftRight className="w-5 h-5" />} text="Switch Linkhubs" />

            <div className="my-3 border-t border-gray-200" />

            <MenuItem icon={<UserCircle className="w-5 h-5" />} text="Account" />
            <MenuItem icon={<Zap className="w-5 h-5" />} text="Upgrade" />

            <div className="my-1 border-t border-gray-200" />
            <MenuItem icon={<LogOut className="w-5 h-5" />} text="Log out" />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors">
      <span className="text-gray-700">{icon}</span>
      <span className="text-[15px] font-medium text-gray-900">{text}</span>
    </div>
  );
}
