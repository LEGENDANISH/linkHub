// Q1.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Q1 = ({ onContinue, onSkip, direction = 1 }) => {
  const [selected, setSelected] = useState(null);
  const optionsRef = useRef([]);
  const titleRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Set initial visibility
    gsap.set([titleRef.current, ...optionsRef.current], { opacity: 1, visibility: 'visible' });
    
    // GSAP entrance animations
    const tl = gsap.timeline();
    
    tl.fromTo(progressRef.current, 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    )
    .fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
    .fromTo(optionsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3");
  }, []);

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

  const handleSelect = (id) => {
    setSelected(id);
    // Subtle pulse animation on selection
    const selectedIndex = options.findIndex(opt => opt.id === id);
    if (optionsRef.current[selectedIndex]) {
      gsap.fromTo(optionsRef.current[selectedIndex],
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }
  };

  const handleContinue = () => {
    if (selected) {
      onContinue(selected);
    }
  };

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  return (
    <motion.div 
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#f5f5f5] flex flex-col"
    >
      {/* Top bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-end px-6 py-4"
      >
        <button 
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black transition-colors duration-200"
        >
          Skip
        </button>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full flex justify-center">
        <div className="w-32 sm:w-40 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-1/3 h-1 bg-purple-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-10 sm:mt-14 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
          Which best describes your goal for using LinkHub?
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          This helps us personalize your experience.
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5 px-4">
        {options.map((item, index) => (
          <div
            key={item.id}
            ref={el => optionsRef.current[index] = el}
            onClick={() => handleSelect(item.id)}
            className={`flex items-center justify-between 
                        border rounded-xl px-5 sm:px-6 py-4 sm:py-5 cursor-pointer
                        transition-all duration-300 transform
                        ${
                          selected === item.id
                            ? "border-black bg-white shadow-lg scale-[1.02]"
                            : "border-gray-300 bg-white hover:bg-gray-50 hover:shadow-md hover:scale-[1.01]"
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
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.color} transition-transform duration-300 ${
              selected === item.id ? "scale-110" : ""
            }`} />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`mt-10 sm:mt-12 mb-12 px-8 sm:px-10 py-3 sm:py-4 
          rounded-full text-base sm:text-lg font-semibold transition-all duration-300
          transform hover:scale-105 active:scale-95
          ${
            selected
              ? "bg-gray-800 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Q1;