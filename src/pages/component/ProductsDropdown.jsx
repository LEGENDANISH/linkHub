import React, { useState } from "react";
import {
  Link2,
  Share2,
  BarChart3,
  ChevronRight
} from "lucide-react";

const menuData = {
  link: {
    title: "Link in bio + tools",
    icon: Link2,
    items: [
      { name: "Custom link pages", desc: "Build your personal link hub" },
      { name: "Short links", desc: "Trackable short URLs" },
      { name: "QR codes", desc: "Generate branded QR codes" },
    ],
    preview: {
      title: "Build your link hub",
      desc: "Create, customize and track your link in bio page.",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800",
    },
  },

  social: {
    title: "Manage your social media",
    icon: Share2,
    items: [
      { name: "Post scheduling", desc: "Plan content ahead" },
      { name: "Auto publishing", desc: "Hands-free posting" },
      { name: "Content calendar", desc: "Organize campaigns" },
    ],
    preview: {
      title: "Automate your social",
      desc: "Schedule posts and manage all platforms in one place.",
      image:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800",
    },
  },

  growth: {
    title: "Measure your success",
    icon: BarChart3,
    items: [
      { name: "Analytics dashboard", desc: "Track clicks & views" },
      { name: "Audience insights", desc: "Understand your followers" },
      { name: "Conversion tracking", desc: "Improve engagement" },
    ],
    preview: {
      title: "Grow with analytics",
      desc: "Make data-driven decisions using powerful insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    },
  },
};

const ProductsDropdown = () => {
  const [active, setActive] = useState("link");

  return (
    <div className="absolute top-full mt-6
                    ml-[-200px] 
                    w-[95vw] sm:w-[600px] md:w-[750px] lg:w-[850px]
                    bg-white shadow-2xl rounded-3xl 
                    p-6 md:p-8 
                    grid grid-cols-1 md:grid-cols-3 
                    gap-6 md:gap-8 
                    z-50">

      {/* COLUMN 1 — STATIC */}
      <div className="flex flex-col gap-2 md:border-r md:pr-6 border-gray-200">
        {Object.keys(menuData).map((key) => {
          const Icon = menuData[key].icon;
          return (
            <div
              key={key}
              onMouseEnter={() => setActive(key)}
              className={`p-3 rounded-xl cursor-pointer transition 
                flex items-center justify-between
                ${
                  active === key
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{menuData[key].title}</span>
              </div>

              {/* right arrow */}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          );
        })}
      </div>

      {/* COLUMN 2 — FEATURES */}
      <div className="flex flex-col gap-4 md:border-r md:pr-6 border-gray-200">
        <h4 className="font-semibold text-gray-900">
          {menuData[active].title}
        </h4>

        {menuData[active].items.map((item, i) => (
          <div
            key={i}
            className="cursor-pointer group transition p-2 rounded-lg hover:bg-gray-50"
          >
            <p className="font-medium text-gray-800 group-hover:text-black">
              {item.name}
            </p>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* COLUMN 3 — PREVIEW */}
      <div className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col justify-between">
        <img
          src={menuData[active].preview.image}
          className="h-[160px] w-full object-cover"
        />

        <div className="p-5">
          <h4 className="font-bold text-lg text-gray-900">
            {menuData[active].preview.title}
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            {menuData[active].preview.desc}
          </p>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDropdown;
