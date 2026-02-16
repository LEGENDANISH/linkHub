import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  FaInstagram,
  FaWhatsapp,
  FaSpotify,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTwitch,
  FaSnapchat
} from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { SiTiktok } from "react-icons/si";

const Q3 = ({ selectedPlatforms = [], onContinue, onBack, onSkip, direction = 1 }) => {
  const [links, setLinks] = useState({});
  const [errors, setErrors] = useState({});
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const progressRef = useRef(null);

  const platformConfig = {
    instagram: {
      icon: FaInstagram,
      gradient: "from-purple-600 to-pink-500",
      placeholder: "instagram.com/yourhandle",
      label: "Instagram Profile"
    },
    whatsapp: {
      icon: FaWhatsapp,
      gradient: "from-green-500 to-emerald-600",
      placeholder: "+1234567890 or whatsapp link",
      label: "WhatsApp Number"
    },
    tiktok: {
      icon: SiTiktok,
      gradient: "from-black to-pink-500",
      placeholder: "tiktok.com/@yourhandle",
      label: "TikTok Profile"
    },
    youtube: {
      icon: FaYoutube,
      gradient: "from-red-600 to-red-700",
      placeholder: "youtube.com/@yourchannel",
      label: "YouTube Channel"
    },
    website: {
      icon: TbWorld,
      gradient: "from-blue-500 to-cyan-500",
      placeholder: "https://yourwebsite.com",
      label: "Personal Website"
    },
    spotify: {
      icon: FaSpotify,
      gradient: "from-green-400 to-green-600",
      placeholder: "open.spotify.com/artist/...",
      label: "Spotify Profile"
    },
    threads: {
      icon: BsThreads,
      gradient: "from-gray-800 to-black",
      placeholder: "threads.net/@yourhandle",
      label: "Threads Profile"
    },
    facebook: {
      icon: FaFacebook,
      gradient: "from-blue-600 to-blue-700",
      placeholder: "facebook.com/yourpage",
      label: "Facebook Page"
    },
    twitter: {
      icon: FaTwitter,
      gradient: "from-gray-900 to-black",
      placeholder: "x.com/yourhandle",
      label: "X / Twitter Profile"
    },
    linkedin: {
      icon: FaLinkedin,
      gradient: "from-blue-700 to-blue-800",
      placeholder: "linkedin.com/in/yourprofile",
      label: "LinkedIn Profile"
    },
    twitch: {
      icon: FaTwitch,
      gradient: "from-purple-600 to-purple-700",
      placeholder: "twitch.tv/yourchannel",
      label: "Twitch Channel"
    },
    snapchat: {
      icon: FaSnapchat,
      gradient: "from-yellow-400 to-yellow-500",
      placeholder: "snapchat.com/add/yourhandle",
      label: "Snapchat Profile"
    }
  };

  useEffect(() => {
    // Set initial visibility
    if (titleRef.current && cardsRef.current.length > 0) {
      gsap.set([titleRef.current, ...cardsRef.current.filter(el => el)], { opacity: 1, visibility: 'visible' });
      
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
      .fromTo(cardsRef.current.filter(el => el),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out"
        }, "-=0.3");
    }
  }, [selectedPlatforms]);

  const handleInputChange = (platformId, value) => {
    setLinks(prev => ({
      ...prev,
      [platformId]: value
    }));
    
    if (errors[platformId]) {
      setErrors(prev => ({
        ...prev,
        [platformId]: false
      }));
    }

    // Subtle success animation when field is filled
    if (value.trim() !== '') {
      const cardIndex = selectedPlatforms.indexOf(platformId);
      if (cardIndex !== -1 && cardsRef.current[cardIndex]) {
        gsap.fromTo(cardsRef.current[cardIndex],
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
    }
  };

  const validateLinks = () => {
    const newErrors = {};
    let isValid = true;

    selectedPlatforms.forEach(platformId => {
      if (!links[platformId] || links[platformId].trim() === '') {
        newErrors[platformId] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    // Shake animation for error fields
    if (!isValid) {
      selectedPlatforms.forEach((platformId, index) => {
        if (newErrors[platformId] && cardsRef.current[index]) {
          gsap.fromTo(cardsRef.current[index],
            { x: -10 },
            { 
              x: 10,
              duration: 0.1,
              repeat: 3,
              yoyo: true,
              ease: "power2.inOut"
            }
          );
        }
      });
    }
    
    return isValid;
  };

  const handleContinue = () => {
    if (validateLinks()) {
      onContinue(links);
    }
  };

  const filledCount = Object.values(links).filter(link => link && link.trim() !== '').length;

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
        className="w-full flex items-center justify-between px-6 py-5"
      >
        <button 
          onClick={onBack}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          ← Back
        </button>
        <button 
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Skip
        </button>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-3/4 h-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-8 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Add your links
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg font-medium max-w-md mx-auto">
          Complete the fields below to add your content to your new LinkHub.
        </p>
      </div>

      {/* Selected platforms counter */}
      <div className="text-center mt-6 px-6">
        <motion.div
          key={filledCount}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 font-bold text-sm rounded-full"
        >
          <span>✓</span>
          <span>{filledCount}/{selectedPlatforms.length} completed</span>
        </motion.div>
      </div>

      {/* Links input section */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-8 overflow-y-auto">
        <div className="space-y-5">
          {selectedPlatforms.map((platformId, index) => {
            const config = platformConfig[platformId];
            const hasError = errors[platformId];
            const isFilled = links[platformId] && links[platformId].trim() !== '';

            return (
              <div 
                key={platformId}
                ref={el => cardsRef.current[index] = el}
                className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
              >
                {/* Platform header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110`}>
                    <config.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">
                      {config.label}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {isFilled && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
                      >
                        <span className="text-white text-sm font-bold">✓</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input field */}
                <div className="relative">
                  <input
                    type="text"
                    value={links[platformId] || ''}
                    onChange={(e) => handleInputChange(platformId, e.target.value)}
                    placeholder={config.placeholder}
                    className={`w-full px-4 py-4 rounded-xl border-2 text-base transition-all duration-300 focus:outline-none ${
                      hasError
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : isFilled
                        ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500'
                        : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white focus:shadow-md'
                    }`}
                  />
                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-2 ml-1 font-medium"
                      >
                        Please enter your {config.label.toLowerCase()}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button - Fixed at bottom */}
      <div className="w-full max-w-2xl mx-auto px-6 pb-8">
        <button
          onClick={handleContinue}
          disabled={filledCount === 0}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg ${
            filledCount > 0
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Q3;