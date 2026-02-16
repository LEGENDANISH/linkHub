import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Plus, Upload, Loader2 } from "lucide-react";

const Q4 = ({ onContinue, onSkip, onBack, direction = 1 }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const titleRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load from localStorage if available
    const savedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    if (savedData.username) {
      setName(savedData.username);
    }

    gsap.set([titleRef.current, contentRef.current], { opacity: 1, visibility: "visible" });

    const tl = gsap.timeline();

    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleContinue = async () => {
    if (!name.trim()) {
      return;
    }

    setIsCreatingLink(true);
    
    try {
      // Pass profile data to parent
      onContinue({
        username: name,
        bio,
        image,
        imageFile, // Include file for upload if needed
      });
    } catch (error) {
      console.error('Error in Q4 continue:', error);
    } finally {
      setIsCreatingLink(false);
    }
  };

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    }),
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
      <div className="w-full flex items-center justify-between px-6 py-5">
        <button
          onClick={onBack}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>

        <button
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-full h-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-8 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Add profile details
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-md mx-auto">
          Add your profile image, name, and bio.
        </p>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="w-full max-w-xl mx-auto mt-12 px-6 flex flex-col items-center flex-1"
      >
        {/* Profile Image */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <span className="text-gray-400 text-5xl">👤</span>
            )}
          </div>

          {/* Upload button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Plus size={20} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </div>

        {/* Display Name */}
        <div className="w-full mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 bg-white focus:outline-none focus:border-purple-500 focus:shadow-md transition-all duration-300 text-base"
          />
        </div>

        {/* Bio */}
        <div className="w-full relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Bio <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 160) setBio(e.target.value);
            }}
            placeholder="Tell people about yourself..."
            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 h-32 resize-none bg-white focus:outline-none focus:border-purple-500 focus:shadow-md transition-all duration-300 text-base"
          />
          <span className={`absolute bottom-4 right-4 text-xs font-medium ${
            bio.length > 140 ? 'text-orange-500' : 'text-gray-400'
          }`}>
            {bio.length}/160
          </span>
        </div>
      </div>

      {/* Continue */}
      <div className="w-full max-w-xl mx-auto px-6 pb-8">
        <button
          onClick={handleContinue}
          disabled={!name.trim() || isCreatingLink}
          className={`w-full py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg ${
            name.trim() && !isCreatingLink
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          {isCreatingLink ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating your LinkHub...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Q4;  