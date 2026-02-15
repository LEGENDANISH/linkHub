import React from "react";

/**
 * Custom Footer Component
 */
function CustomFooter({ design }) {
  return (
    <p
      className="text-xs opacity-70 mt-2 text-center flex-shrink-0"
      style={{ color: design.pageTextColor || "#ffffff" }}
    >
      {design.footerText}
    </p>
  );
}

/**
 * Default Footer Component
 */
function DefaultFooter({ design }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center mt-auto">
      <button
        className="bg-white px-5 py-2 rounded-full font-medium mb-3"
        style={{ color: design.backgroundColor || "#000000" }}
      >
        Join {design.title || "anish"} on Linkhub
      </button>

      <p
        className="text-xs opacity-70"
        style={{ color: design.pageTextColor || "#ffffff" }}
      >
        Report • Privacy
      </p>
    </div>
  );
}

/**
 * Footer Section Component
 */
export function FooterSection({ design }) {
  if (design.footerText) {
    return <CustomFooter design={design} />;
  }
  
  return <DefaultFooter design={design} />;
}