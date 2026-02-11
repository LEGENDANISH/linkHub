import React from "react";

const FontPickerModal = ({ label, selectedFont, fonts, onClose, onSelect }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal - Centered on screen */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <h3 className="text-lg font-semibold">{label}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Font Grid - Scrollable */}
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => onSelect(font.name)}
                className={`p-3 sm:p-4 rounded-xl text-left transition-all relative ${
                  selectedFont === font.name
                    ? "bg-white border-2 border-black"
                    : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
                }`}
              >
                <span className="text-sm sm:text-base font-medium">
                  {font.name}
                </span>
                {font.isPro && (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                    {font.proLevel ? font.proLevel : "✓"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FontPickerModal;