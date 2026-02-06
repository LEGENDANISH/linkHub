import React, { useState, useEffect } from "react";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        // scrolling down
        setShowBar(false);
      } else {
        // scrolling up
        setShowBar(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50
                  transition-all duration-500 ease-in-out
                  ${showBar ? "top-4 sm:top-6 opacity-100" : "-top-32 opacity-0"}
                  w-[94%] sm:w-[90%] md:w-[85%] lg:w-[70%]`}
    >
      
      {/* Floating container */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full 
                      px-4 sm:px-6 py-3 sm:py-4 
                      flex items-center justify-between">

        {/* Logo */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold">
          linkHub
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 
                        text-sm lg:text-base font-semibold text-gray-700">
          <a href="#">Products</a>
          <a href="#">Templates</a>
          <a href="#">Marketplace</a>
          <a href="#">Learn</a>
          <a href="#">Pricing</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="bg-[#f3f3f1] px-4 py-2 rounded-xl text-sm font-semibold">
            Log in
          </button>
          <button className="bg-[#1e293b] text-white px-5 py-2 rounded-full text-sm font-semibold">
            Sign up free
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 bg-white shadow-xl rounded-2xl 
                        p-5 flex flex-col gap-4 font-semibold text-gray-800">
          <a href="#">Products</a>
          <a href="#">Templates</a>
          <a href="#">Marketplace</a>
          <a href="#">Learn</a>
          <a href="#">Pricing</a>

          <div className="flex flex-col gap-3 pt-2">
            <button className="bg-gray-100 px-4 py-2 rounded-full text-left">
              Log in
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Sign up free
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
