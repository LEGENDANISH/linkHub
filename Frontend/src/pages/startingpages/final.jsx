import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
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

const Final = ({ userGoal, profileData, platformLinks, selectedPlatforms }) => {
  const confettiRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const platformIcons = {
    instagram: FaInstagram,
    whatsapp: FaWhatsapp,
    tiktok: SiTiktok,
    youtube: FaYoutube,
    website: TbWorld,
    spotify: FaSpotify,
    threads: BsThreads,
    facebook: FaFacebook,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    twitch: FaTwitch,
    snapchat: FaSnapchat,
  };

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
        return <CreatorTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} platformIcons={platformIcons} />;
      case "business":
        return <BusinessTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} platformIcons={platformIcons} />;
      case "personal":
        return <PersonalTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} platformIcons={platformIcons} />;
      default:
        return <CreatorTemplate profileData={profileData} platformLinks={platformLinks} selectedPlatforms={selectedPlatforms} platformIcons={platformIcons} />;
    }
  };

  const handleContinue = () => {
    // Navigate to edit page or dashboard
    navigate('/edit');
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
        <div className="text-center pt-16 px-6">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
          >
            Looking good! 🎉
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-gray-600 mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
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
            className="mt-16 flex justify-center px-6 pb-12"
          >
            {renderTemplate()}
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center pb-16 px-6"
        >
          <button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-12 py-5 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
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
      `}</style>
    </div>
  );
};

// CREATOR TEMPLATE - Vibrant, modern, lava lamp style
const CreatorTemplate = ({ profileData, platformLinks, selectedPlatforms, platformIcons }) => {
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
            {profileData?.image ? (
              <img src={profileData.image} alt={profileData.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {profileData?.username || "Your Name"}
          </h2>
          {profileData?.bio && (
            <p className="text-white text-opacity-90 text-sm mt-2 px-4">
              {profileData.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {selectedPlatforms?.slice(0, 5).map((platform, index) => {
            const Icon = platformIcons[platform];
            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-4 flex items-center gap-3 font-semibold text-gray-800 hover:bg-opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg"
              >
                {Icon && <Icon size={20} />}
                <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
              </motion.div>
            );
          })}
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
const BusinessTemplate = ({ profileData, platformLinks, selectedPlatforms, platformIcons }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 pb-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
            {profileData?.image ? (
              <img src={profileData.image} alt={profileData.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center">
                <span className="text-4xl">💼</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {profileData?.username || "Business Name"}
          </h2>
          {profileData?.bio ? (
            <p className="text-blue-100 text-sm mt-2 px-4">
              {profileData.bio}
            </p>
          ) : (
            <p className="text-blue-100 text-sm">Professional Profile</p>
          )}
        </div>
      </div>

      {/* Links Section */}
      <div className="p-8 -mt-8">
        <div className="space-y-3">
          {selectedPlatforms?.slice(0, 5).map((platform, index) => {
            const Icon = platformIcons[platform];
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-3 font-semibold text-gray-800 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                {Icon && <Icon size={20} />}
                <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// PERSONAL TEMPLATE - Warm, friendly, soft colors
const PersonalTemplate = ({ profileData, platformLinks, selectedPlatforms, platformIcons }) => {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 rounded-3xl shadow-2xl overflow-hidden p-8">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
          {profileData?.image ? (
            <img src={profileData.image} alt={profileData.username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
              <span className="text-5xl">✨</span>
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {profileData?.username || "Your Name"}
        </h2>
        {profileData?.bio ? (
          <p className="text-gray-600 text-sm px-4">
            {profileData.bio}
          </p>
        ) : (
          <p className="text-gray-600 text-sm">Connect with me ✨</p>
        )}
      </div>

      {/* Links */}
      <div className="space-y-4">
        {selectedPlatforms?.slice(0, 5).map((platform, index) => {
          const Icon = platformIcons[platform];
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.3 + index * 0.1, type: "spring" }}
              className="bg-white rounded-full px-6 py-4 flex items-center gap-3 font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-400 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 shadow-md hover:shadow-xl"
            >
              {Icon && <Icon size={20} />}
              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </motion.div>
          );
        })}
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