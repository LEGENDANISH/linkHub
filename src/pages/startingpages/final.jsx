import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Final = ({ userGoal, profileData, platformLinks, selectedPlatforms }) => {
  const confettiRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Confetti animation
    createConfetti();
    
    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const createConfetti = () => {
    const colors = ["#ef4444", "#f59e0b", "#eab308", "#a855f7", "#ec4899", "#6366f1"];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confettiRef.current?.appendChild(confetti);

      gsap.fromTo(
        confetti,
        {
          y: -100,
          rotation: 0,
          opacity: 1,
        },
        {
          y: window.innerHeight + 100,
          rotation: Math.random() * 720 - 360,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 0.5,
          ease: "power1.in",
        }
      );
    }
  };

  // Render different templates based on userGoal
  const renderTemplate = () => {
    switch (userGoal) {
      case "creator":
        return <CreatorTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} />;
      case "business":
        return <BusinessTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} />;
      case "personal":
        return <PersonalTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} />;
      default:
        return <CreatorTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10"
      >
        {/* Header */}
        <div className="text-center pt-12 px-4">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Looking good! 🎉
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-gray-600 mt-4 text-base sm:text-lg max-w-xl mx-auto"
          >
            Your LinkHub is off to a great start.
            <br />
            Continue building to make it even better.
          </motion.p>
        </div>

        {/* Template Preview */}
        {showContent && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 flex justify-center px-4 pb-12"
          >
            {renderTemplate()}
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center pb-12 px-4"
        >
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 sm:px-12 py-4 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Continue building this LinkHub
          </button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

// CREATOR TEMPLATE - Vibrant, modern, lava lamp style
const CreatorTemplate = ({ profileData, platformLinks, selectedPlatforms }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative">
      {/* Lava Lamp Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {profileData?.username || ""}
          </h2>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {selectedPlatforms?.slice(0, 4).map((platform, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-4 text-center font-semibold text-gray-800 hover:bg-opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

// BUSINESS TEMPLATE - Professional, clean, gradient
const BusinessTemplate = ({ profileData, platformLinks, selectedPlatforms }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 pb-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {profileData?.username || "05anish"}
          </h2>
          <p className="text-blue-100 text-sm">Professional Profile</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="p-8 -mt-8">
        <div className="space-y-3">
          {selectedPlatforms?.slice(0, 4).map((platform, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-center font-semibold text-gray-800 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// PERSONAL TEMPLATE - Warm, friendly, soft colors
const PersonalTemplate = ({ profileData, platformLinks, selectedPlatforms }) => {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 rounded-3xl shadow-2xl overflow-hidden p-8">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
            <svg className="w-14 h-14 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {profileData?.username || "05anish"}
        </h2>
        <p className="text-gray-600 text-sm">Connect with me ✨</p>
      </div>

      {/* Links */}
      <div className="space-y-4">
        {selectedPlatforms?.slice(0, 4).map((platform, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3 + index * 0.1, type: "spring" }}
            className="bg-white rounded-full px-6 py-4 text-center font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-400 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 shadow-md hover:shadow-xl"
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
      </div>
    </div>
  );
};

export default Final;