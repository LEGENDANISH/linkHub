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
      color: "bg-gradient-to-br from-lime-400 to-emerald-500",
      emoji: "🎨",
    },
    {
      id: "business",
      title: "Business",
      desc: "Grow my business and reach more customers.",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600",
      emoji: "💼",
    },
    {
      id: "personal",
      title: "Personal",
      desc: "Share links with my friends and acquaintances.",
      color: "bg-gradient-to-br from-rose-500 to-pink-600",
      emoji: "✨",
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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col"
    >
      {/* Top bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-end px-6 py-5"
      >
        <button 
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          Skip
        </button>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-1/4 h-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-8 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Which best describes your goal<br />for using LinkHub?
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-md mx-auto">
          This helps us personalize your experience.
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-2xl mx-auto mt-12 flex flex-col gap-4 px-6 flex-1">
        {options.map((item, index) => (
          <div
            key={item.id}
            ref={el => optionsRef.current[index] = el}
            onClick={() => handleSelect(item.id)}
            className={`flex items-center justify-between 
                        border-2 rounded-2xl px-6 py-6 cursor-pointer
                        transition-all duration-300 transform bg-white
                        ${
                          selected === item.id
                            ? "border-purple-500 shadow-xl scale-[1.02]"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-[1.01]"
                        }`}
          >
            {/* Text */}
            <div className="text-left flex-1">
              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-1">{item.title}</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>

            {/* Icon */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${item.color} transition-transform duration-300 flex items-center justify-center text-3xl shadow-lg ${
              selected === item.id ? "scale-110" : ""
            }`}>
              {item.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center py-12 px-6">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`px-12 py-4 rounded-full text-lg font-bold transition-all duration-300
          transform hover:scale-105 active:scale-95 shadow-lg
          ${
            selected
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-xl"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Q1;