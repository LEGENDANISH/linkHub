// Q1.jsx
import React, { useState } from "react";

const Q1 = ({ onContinue, onSkip }) => {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      id: "creator",
      title: "Creator",
      desc: "Build my following and explore ways to monetize my audience.",
      color: "bg-lime-400",
    },
    {
      id: "business",
      title: "Business",
      desc: "Grow my business and reach more customers.",
      color: "bg-purple-500",
    },
    {
      id: "personal",
      title: "Personal",
      desc: "Share links with my friends and acquaintances.",
      color: "bg-red-500",
    },
  ];

  const handleContinue = () => {
    if (selected) {
      onContinue(selected);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      
      {/* Top bar */}
      <div className="w-full flex items-center justify-end px-6 py-4">
        <button 
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black transition"
        >
          Skip
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-10 sm:mt-14 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
          Which best describes your goal for using LinkHub?
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          This helps us personalize your experience.
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5 px-4">
        {options.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`flex items-center justify-between 
                        border rounded-xl px-5 sm:px-6 py-4 sm:py-5 cursor-pointer
                        transition-all
                        ${
                          selected === item.id
                            ? "border-black bg-white shadow-md"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
          >
            {/* Text */}
            <div className="text-left">
              <h2 className="font-bold text-base sm:text-lg">{item.title}</h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                {item.desc}
              </p>
            </div>

            {/* Icon */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.color}`} />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`mt-10 sm:mt-12 mb-12 px-8 sm:px-10 py-3 sm:py-4 
          rounded-full text-base sm:text-lg font-semibold transition
          ${
            selected
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Q1;