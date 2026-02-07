import React, { useState, useRef, useEffect } from "react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

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

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-300" />

        {/* Name */}
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-800">Anish</span>

          {/* arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-gray-500 transition ${
              open ? "rotate-180" : ""
            }`}
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
        <div className="absolute top-14 left-0 w-72 bg-white rounded-2xl shadow-xl border py-2 z-50">

          {/* Profile header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">Anish</p>
                <p className="text-sm text-gray-500">
                  linktr.ee/05anish
                </p>
              </div>
            </div>

            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              Pro
            </span>
          </div>

          {/* menu items */}
          <div className="py-2">

            <MenuItem icon="⚙️" text="Manage my Linktrees" />
            <MenuItem icon="👤" text="Account" />
            <MenuItem icon="⚡" text="Keep Pro access" />

            <hr className="my-2" />

            <MenuItem icon="❓" text="Ask a question" />
            <MenuItem icon="📘" text="Help topics" />
            <MenuItem icon="💡" text="Share feedback" />

            <hr className="my-2" />

            <MenuItem icon="🚪" text="Log out" danger />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, text, danger }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
        danger ? "text-red-500" : "text-gray-700"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
