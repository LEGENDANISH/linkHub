import React, { useState, useEffect } from "react";
import ProductsDropdown from "./ProductsDropdown";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowBar(false);
      } else {
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
                  w-[94%] sm:w-[90%] md:w-[85%] lg:w-[70%] xl:w-[65%]`}
    >
      
      {/* Floating container */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full 
                      px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 
                      flex items-center justify-between">

        {/* Logo */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
          linkHub
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-20 
                       text-xs lg:text-sm xl:text-base font-semibold text-gray-700">
          <div 
            className="relative"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <span className="cursor-pointer hover:text-black transition">Products</span>
            
            {/* Invisible bridge to prevent gap */}
            {showProducts && (
              <div className="absolute top-full left-0 w-full h-10" />
            )}
            
            {showProducts && <ProductsDropdown />}
          </div>

          <a href="#" className="hover:text-black transition">Templates</a>
          <a href="#pricing" className="hover:text-black transition">Pricing</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <button className="bg-[#f3f3f1] px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold hover:bg-gray-200 transition">
            Log in
          </button>
          <button className="bg-[#1e293b] text-white px-3 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-semibold hover:bg-[#334155] transition">
            Sign up free
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-xl sm:text-2xl p-1" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 bg-white shadow-xl rounded-2xl 
                        p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 font-semibold text-gray-800 text-sm sm:text-base">
          <a href="#" className="hover:text-black transition">Products</a>
          <a href="#" className="hover:text-black transition">Templates</a>
          <a href="#" className="hover:text-black transition">Marketplace</a>
          <a href="#" className="hover:text-black transition">Learn</a>
          <a href="#" className="hover:text-black transition">Pricing</a>

          <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
            <button className="bg-gray-100 px-4 py-2.5 rounded-full text-left hover:bg-gray-200 transition">
              Log in
            </button>
            <button className="bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition">
              Sign up free
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;