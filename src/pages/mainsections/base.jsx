import React, { useState } from "react";
import ProfileDropdown from "./components/ProfileDropdown";
import Middle from "./middle/middle";

export default function LinktreeDashboard() {
      const [open, setOpen] = useState(true);

  return (
<div className="w-full h-screen bg-[#f5f6f8] flex overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
     <div className="flex items-center justify-between mb-6">
  
  <ProfileDropdown />

  {/* Right: bell icon */}
  <div className="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
      />
    </svg>
  </div>

</div>


           <nav className="space-y-4">

      {/* Dropdown header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-md px-2 py-1 rounded-xl cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {/* icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 256 256"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm136-24a8,8,0,0,1-8,8H184v24a8,8,0,0,1-16,0V184H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v24h24A8,8,0,0,1,216,176Z" />
          </svg>

          <span className="font-medium text-gray-800">My LinkHub</span>
        </div>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown items */}
      {open && (
        <div className="ml-8 space-y-1">

          {/* active item */}
          <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-medium text-sm">
            Links
          </div>

         

          <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-medium text-sm">
            Design
          </div>

        
        </div>
      )}

      {/* Tools section */}
      <p className="text-gray-400 text-sm uppercase mt-6">Tools</p>

      <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
        Social planner
      </div>

      <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
        Instagram auto-reply
      </div>
    </nav>

        {/* Setup card */}
        <div className="mt-10 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Your setup checklist</p>
          <p className="font-semibold mt-1">1 of 6 complete</p>

          <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg">
            Finish setup
          </button>
        </div>
      </aside>

      {/* Main Content */}
    <Middle/>

      {/* Mobile preview panel */}
      <aside className="w-[360px] bg-white border-l flex justify-center items-center">
        <div className="w-[280px] h-[560px] rounded-[30px] bg-purple-600 p-6 flex flex-col items-center text-white relative">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />
          <p className="font-semibold text-lg">05anish</p>

          <button className="mt-auto bg-white text-purple-700 px-5 py-2 rounded-full font-medium">
            Join 05anish on Linktree
          </button>

          <p className="text-xs opacity-70 mt-3">Report • Privacy</p>
        </div>
      </aside>
    </div>
  );
}
