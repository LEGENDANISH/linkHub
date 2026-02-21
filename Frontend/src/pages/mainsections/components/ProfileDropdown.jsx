import React, { useState, useRef, useEffect } from "react";
import { User, ArrowLeftRight, Plus, UserCircle, Zap, HelpCircle, BookOpen, MessageSquare, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../middle/links/Selectionmanager"; // update path
import { useDesign } from "../middle/Design/DesignSelectionManager"; // update path
import { useSubscription } from "../../../wrapper/SubscriptionManager";
export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [profile, setProfile] = useState(null);
  const ref = useRef();
const navigate = useNavigate();
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


useEffect(() => {
  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      };

      const [profileRes, subRes] = await Promise.all([
        fetch("http://localhost:5000/api/profile/me/profile", { headers }),
        fetch("http://localhost:5000/api/subscriptions/my-subscription", { headers })
      ]);

      const profileData = await profileRes.json();
      const subData = await subRes.json();

      if (profileData.success) {
        const capitalizedSlug =
          profileData.data.slug?.charAt(0).toUpperCase() +
          profileData.data.slug?.slice(1);
        setProfile({ ...profileData.data, slug: capitalizedSlug });
      }

      if (subData.success) {
        setSubscription(subData.data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  fetchData();
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

  // ONLY user image → else default icon
  const profileImage = profile?.user?.image || null;

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
                  linktr.ee/{displayName}
                </p>
              </div>
            </div>

            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${
  subscription?.plan?.name === "PRO"
    ? "bg-purple-100 text-purple-700"
    : "bg-gray-100 text-gray-700"
}`}>
  {subscription?.plan?.displayName || "Free"}
</span>
          </div>

          {/* menu items */}
          <div className="py-1">
              {/* <MenuItem icon={<ArrowLeftRight className="w-5 h-5" />} text="Switch Linkhubs" /> */}

            <div className="my-3 border-t border-gray-200" />

            <MenuItem 
            onClick={()=>{
              navigate('/account')
            }}
            icon={<UserCircle className="w-5 h-5" />} text="Account" />
            <MenuItem
            onClick={()=>{
             navigate("/pricing") 
            }}
            icon={<Zap className="w-5 h-5" />} text="Subscriptions  " />

            <div className="my-1 border-t border-gray-200" />
<MenuItem
  icon={<LogOut className="w-5 h-5" />}
  text="Log out"
  onClick={() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

    // Flush current Zustand state before removing auth
    if (userId) {
      const currentLinks = useSelection.getState().links;
      const currentDesign = useDesign.getState().design;

      localStorage.setItem(
        `Linkhub_links_data_${userId}`,
        JSON.stringify({ state: { links: currentLinks }, version: 0 })
      );
      localStorage.setItem(
        `linkhub_design_${userId}`,
        JSON.stringify({ state: { design: currentDesign }, version: 0 })
      );
    }
  useSubscription.getState().reset();
      localStorage.removeItem("linkhub_subscription");
    // Remove ONLY auth — never clear()
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }}
/>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <span className="text-gray-700">{icon}</span>
      <span className="text-[15px] font-medium text-gray-900">{text}</span>
    </div>
  );
}
