import React, { useState, useEffect } from "react";
import {
  User,
  ArrowLeftRight,
  UserCircle,
  Zap,
  LogOut,
  X,
  ChevronRight,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../middle/links/Selectionmanager";
import { useDesign } from "../middle/Design/DesignSelectionManager";

export default function MobileProfileDropdown({ open, onClose }) {
  const [subscription, setSubscription] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };

        const [profileRes, subRes] = await Promise.all([
          fetch("http://localhost:5000/api/profile/me/profile", { headers }),
          fetch("http://localhost:5000/api/subscriptions/my-subscription", {
            headers,
          }),
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

    if (open) fetchData();
  }, [open]);

  const displayName = profile?.user?.name || "Loading...";
  const slug = profile?.slug;
  const profileImage = profile?.user?.image || null;
  const isPro = subscription?.plan?.name === "PRO";

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

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

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl"
        style={{
          animation: "slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Profile Header Card */}
        <div className="mx-4 mt-3 mb-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100/60">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-7 h-7 text-gray-500" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-base truncate">
                {displayName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                linktr.ee/{slug || displayName}
              </p>
            </div>

            {/* Plan Badge */}
            <span
              className={`flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full ${
                isPro
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isPro && <Crown className="w-3 h-3" />}
              {subscription?.plan?.displayName || "Free"}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 pb-2 space-y-1">
          <MobileMenuItem
            icon={<ArrowLeftRight className="w-5 h-5" />}
            text="Switch Linkhubs"
            onClick={() => {}}
          />

          <div className="my-2 border-t border-gray-100" />

          <MobileMenuItem
            icon={<UserCircle className="w-5 h-5" />}
            text="Account"
            onClick={() => {
              onClose();
              navigate("/account");
            }}
          />

          <MobileMenuItem
            icon={<Zap className="w-5 h-5" />}
            text="Upgrade to Pro"
            onClick={() => {}}
            highlight={!isPro}
          />

          <div className="my-2 border-t border-gray-100" />

          <MobileMenuItem
            icon={<LogOut className="w-5 h-5" />}
            text="Log out"
            onClick={handleLogout}
            danger
          />
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-6" />
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function MobileMenuItem({ icon, text, onClick, danger, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors text-left ${
        danger
          ? "hover:bg-red-50 text-red-500"
          : highlight
          ? "hover:bg-purple-50 text-purple-600"
          : "hover:bg-gray-50 text-gray-800"
      }`}
    >
      <span className={danger ? "text-red-400" : highlight ? "text-purple-500" : "text-gray-500"}>
        {icon}
      </span>
      <span className="text-[15px] font-medium flex-1">{text}</span>
      <ChevronRight className={`w-4 h-4 opacity-30 ${danger ? "text-red-400" : "text-gray-400"}`} />
    </button>
  );
}