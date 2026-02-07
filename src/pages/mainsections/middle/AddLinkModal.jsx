import React, { useState } from "react";

const categories = [
  "Suggested",
  "Commerce",
  "Social",
  "Media",
  "Contact",
  "Events",
  "Text",
];

const sections = [
  {
    title: "Affiliate products",
    items: [
      { name: "Shopify", desc: "Display your Shopify store products" },
      { name: "Fourthwall", desc: "Sell custom merch & products" },
      { name: "Amaze", desc: "Simple store monetization platform" },
      { name: "Books", desc: "Promote and sell books" },
      { name: "Bonfire", desc: "Sell custom premium products" },
    ],
  },
  {
    title: "Communities",
    items: [
      { name: "Discord servers", desc: "Grow your Discord community" },
      { name: "WhatsApp groups", desc: "Add members to WhatsApp" },
      { name: "Slack workspaces", desc: "Invite people to Slack" },
    ],
  },
  {
    title: "Promotions",
    items: [
      { name: "Discount Code", desc: "Display a discount code" },
      { name: "Gleam", desc: "Run giveaways & campaigns" },
    ],
  },
  {
    title: "Fundraising",
    items: [
      { name: "GoFundMe", desc: "Support and promote causes" },
    ],
  },
  {
    title: "Other digital",
    items: [
      { name: "SendOwl", desc: "Sell digital goods" },
      { name: "Mobile App", desc: "Drive app downloads" },
    ],
  },
  {
    title: "Social",
    items: [
      { name: "Instagram", desc: "Show posts & reels" },
      { name: "TikTok", desc: "Share TikTok videos" },
      { name: "YouTube", desc: "Show YouTube videos" },
      { name: "Spotify", desc: "Share music" },
    ],
  },
  {
    title: "Media",
    items: [
      { name: "Video", desc: "Embed videos" },
      { name: "PDF display", desc: "Show PDF files" },
      { name: "Music", desc: "Share music players" },
      { name: "Podcasts", desc: "Promote podcasts" },
    ],
  },
  {
    title: "Contact",
    items: [
      { name: "Form", desc: "Collect visitor messages" },
      { name: "Email signup", desc: "Collect emails" },
      { name: "SMS signup", desc: "Collect phone numbers" },
      { name: "Typeform", desc: "Interactive forms" },
    ],
  },
  {
    title: "Details",
    items: [
      { name: "Maps", desc: "Show location" },
      { name: "FAQs", desc: "Display FAQs" },
      { name: "Chatbot", desc: "Interactive chatbot" },
      { name: "Stats", desc: "Show metrics" },
    ],
  },
  {
    title: "Scheduling",
    items: [
      { name: "Calendly", desc: "Schedule meetings" },
    ],
  },
  {
    title: "Events",
    items: [
      { name: "Tour and Events", desc: "Promote events" },
      { name: "Bands In Town", desc: "Artist events" },
    ],
  },
  {
    title: "Text",
    items: [
      { name: "Text", desc: "Display custom text" },
      { name: "Header", desc: "Add section headers" },
    ],
  },
];

export default function AddLinkModal({ onClose }) {
  const [activeCategory, setActiveCategory] = useState("Suggested");

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[1000px] h-[85vh] rounded-2xl shadow-xl flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-64 border-r p-4">
          <h2 className="font-semibold mb-4">Add</h2>

          <input
            placeholder="Paste or search a link"
            className="w-full mb-4 px-3 py-2 border rounded-lg"
          />

          <div className="space-y-1">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-lg cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">

          {sections.map((section) => (
            <div key={section.title} className="mb-8">

              {/* Section title */}
              <h3 className="font-semibold text-lg mb-3">
                {section.title}
              </h3>

              {/* Section items */}
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.desc}
                      </p>
                    </div>

                    <span className="text-gray-400">›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </main>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
