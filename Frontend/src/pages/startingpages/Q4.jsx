import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Plus } from "lucide-react";

const Q4 = ({ onContinue, onSkip, onBack, direction = 1 }) => {
  const [name, setName] = useState("05anish");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const titleRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
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
      setImage(URL.createObjectURL(file));
    }
  };

  const handleContinue = () => {
    onContinue({
      username: name,
      bio,
      image,
    });
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
      className="min-h-screen bg-[#f5f5f5] flex flex-col"
    >
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black"
        >
          Back
        </button>

        <button
          onClick={onSkip}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-black"
        >
          Skip
        </button>
      </div>

   <div className="w-full flex justify-center mb-2">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full origin-left"
          />
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mt-10 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
          Add profile details
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Add your profile image, name, and bio.
        </p>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="w-full max-w-xl mx-auto mt-10 px-4 flex flex-col items-center"
      >
        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-4xl">👤</span>
            )}
          </div>

          {/* Upload button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg"
          >
            <Plus size={16} />
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Bio */}
        <div className="w-full relative">
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 160) setBio(e.target.value);
            }}
            placeholder="Bio"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 h-28 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">
            {bio.length}/160
          </span>
        </div>
      </div>

      {/* Continue */}
      <div className="flex justify-center mt-12 mb-16">
        <button
          onClick={handleContinue}
          className="px-10 py-4 bg-purple-600 text-white font-semibold rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Q4;