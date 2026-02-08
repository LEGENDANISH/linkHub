import React from "react";
import {
  User,
  LayoutGrid,
  Image as ImageIcon,
  Type,
  Square,
  Palette,
  Sparkles
} from "lucide-react";

const tabs = [
  { id: "header", label: "Header", icon: User },
  { id: "theme", label: "Theme", icon: LayoutGrid },
  { id: "wallpaper", label: "Wallpaper", icon: ImageIcon },
  { id: "text", label: "Text", icon: Type },
  { id: "buttons", label: "Buttons", icon: Square },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "footer", label: "Footer", icon: Sparkles },
];

const DesignSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-[#F3F4F6] border-r border-gray-200 h-full">
      {/* Tabs */}
      <div className="p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                ${
                  isActive
                    ? "bg-gray-100 border border-gray-300"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
            >
              <Icon
                size={18}
                className={`${isActive ? "text-black" : "text-gray-600"}`}
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-black" : "text-gray-700"
                }`}
              >
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DesignSidebar;