import React from "react";
import ProWrapper from "../../../../../../wrapper/ProGate";

const FontPickerModal = ({ label, selectedFont, fonts, onClose, onSelect }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
w-[90vw] sm:w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 
max-h-[80vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
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

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-4">
            {fonts.map((font) => (
              <ProWrapper key={font.name} label={`${font.name} font`}>
                <button
                  isPro={font.isPro}
                  onClick={() => onSelect(font.name)}
                  className={`p-3 sm:p-4 rounded-xl text-left transition-all relative w-full ${
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
              </ProWrapper>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FontPickerModal;