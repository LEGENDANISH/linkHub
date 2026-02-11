import React from "react";

export const VideoInfoBanner = () => (
  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <div>
        <p className="text-sm font-medium text-purple-900 mb-1">
          Animated Video Backgrounds
        </p>
        <p className="text-xs text-purple-700">
          These themes feature stunning video backgrounds with glass-morphism buttons for a premium, modern look.
        </p>
      </div>
    </div>
  </div>
);

export const AdvancedInfoBanner = () => (
  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-xl">
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <div>
        <p className="text-sm font-medium text-indigo-900 mb-1">
          Advanced Patterns & Effects
        </p>
        <p className="text-xs text-indigo-700">
          Explore unique designs with animated patterns, morphing shapes, and custom CSS effects for a truly distinctive look.
        </p>
      </div>
    </div>
  </div>
);