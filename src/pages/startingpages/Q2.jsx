// Q2.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Q2 = ({ onContinue, onBack, onSkip, direction = 1 }) => {
  const MAX_SELECT = 5;
  const [selected, setSelected] = useState([]);
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const progressRef = useRef(null);

  const platforms = [
    { id: "instagram", name: "Instagram", icon: "📸", gradient: "from-purple-600 to-pink-500" },
    { id: "whatsapp", name: "WhatsApp", icon: "💬", gradient: "from-green-500 to-green-600" },
    { id: "tiktok", name: "TikTok", icon: "🎵", gradient: "from-black to-pink-500" },
    { id: "youtube", name: "YouTube", icon: "▶️", gradient: "from-red-600 to-red-700" },
    { id: "website", name: "Personal Website", icon: "🌐", gradient: "from-blue-500 to-cyan-500" },
    { id: "spotify", name: "Spotify", icon: "🎧", gradient: "from-green-400 to-green-600" },
    { id: "threads", name: "Threads", icon: "🧵", gradient: "from-gray-800 to-black" },
    { id: "facebook", name: "Facebook", icon: "📘", gradient: "from-blue-600 to-blue-700" },
    { id: "twitter", name: "X / Twitter", icon: "🐦", gradient: "from-gray-900 to-black" },
  ];

  useEffect(() => {
    // Set initial visibility
    if (gridRef.current && titleRef.current) {
      gsap.set([titleRef.current, ...gridRef.current.children], { opacity: 1, visibility: 'visible' });
      
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
      .fromTo(gridRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: {
            amount: 0.6,
            from: "start",
            grid: "auto"
          },
          duration: 0.4,
          ease: "back.out(1.7)"
        }, "-=0.3");
    }
  }, []);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      if (selected.length < MAX_SELECT) {
        setSelected([...selected, id]);
        // Celebratory animation when selecting
        const platformElement = document.querySelector(`[data-platform="${id}"]`);
        if (platformElement) {
          gsap.fromTo(platformElement, 
            { scale: 1 },
            { 
              scale: 1.1,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            }
          );
        }
      }
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
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
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
    >
      {/* Top nav */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 py-5"
      >
        <button 
          onClick={onBack}
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-200"
        >
          ← Back
        </button>
        <button 
          onClick={onSkip}
          className="text-gray-500 font-medium hover:text-gray-700 transition-colors duration-200"
        >
          Skip
        </button>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-2/4 h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Which platforms are you on?
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-md mx-auto">
          Pick up to {MAX_SELECT} to get started. You can always update these later.
        </p>
        <motion.p 
          key={selected.length}
          initial={{ scale: 1.2, color: "#9333ea" }}
          animate={{ scale: 1, color: "#9333ea" }}
          className="text-sm text-purple-600 font-medium mt-2"
        >
          {selected.length}/{MAX_SELECT} selected
        </motion.p>
      </div>

      {/* Grid */}
      <div className="mt-12 px-6 flex justify-center flex-1">
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg w-full h-fit"
        >
          {platforms.map((item) => {
            const isActive = selected.includes(item.id);
            const isDisabled = !isActive && selected.length >= MAX_SELECT;

            return (
              <div
                key={item.id}
                data-platform={item.id}
                onClick={() => !isDisabled && toggleSelect(item.id)}
                className={`relative cursor-pointer border-2 rounded-2xl 
                            flex flex-col items-center justify-center
                            py-8 transition-all duration-300 transform
                            ${
                              isActive
                                ? "border-purple-600 bg-white shadow-xl scale-105"
                                : isDisabled
                                ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-105"
                            }`}
              >
                {/* Checkmark for selected items */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                )}
                
                <div className={`text-4xl mb-3 transition-transform duration-300 ${
                  isActive ? "scale-110" : ""
                }`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center px-2">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center py-10 px-6">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`px-16 py-4 rounded-full text-base font-semibold transition-all duration-300
            shadow-lg transform hover:scale-105 active:scale-95
            ${
              selected.length > 0
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-2xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Q2;