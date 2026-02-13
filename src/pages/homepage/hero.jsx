import React from "react";
import Topbar from "../component/topbar";

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-[#d2e823]">
      
      {/* Floating navbar */}
      <Topbar />

      {/* Hero content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 pt-32 pb-12 lg:pt-0 lg:pb-0">
        
        {/* Left section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          
          {/* Heading */}
          <h1 className="text-[#254f1a] font-extrabold mb-4 sm:mb-6 
                         text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            A Link in bio built <br className="hidden sm:block"/> for you.
          </h1>

          {/* Paragraph */}
          <p className="text-[#254f1a] text-sm sm:text-base md:text-lg font-medium max-w-xl mb-6">
            Join 70M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your Instagram, TikTok,
            Twitter, YouTube and other social media profiles.
          </p>

          {/* Input + Button */}
          <div className="mt-2 sm:mt-6 flex flex-col sm:flex-row w-full max-w-md">
            <input
              type="text"
              placeholder="linkhub/"
              className="px-4 py-3 bg-white rounded-2xl sm:rounded-r-none outline-none w-full text-sm sm:text-base"
            />
            <button className="px-6 py-3 mt-3 sm:mt-0 bg-[#254f1a] text-white rounded-2xl sm:rounded-l-none font-semibold w-full sm:w-auto text-sm sm:text-base hover:opacity-90 transition">
              Get Started
            </button>
          </div>

        </div>

        {/* Right section - image/video space */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex items-center justify-center">
          {/* Desktop: Full space for image/video */}
          <div className="hidden lg:flex w-full h-[500px] xl:h-[600px] items-center justify-center">
            {/* Place hero image / mockup here later */}
            <div className="w-full h-full bg-gray-200/30 rounded-3xl flex items-center justify-center text-[#254f1a] opacity-50">
              Image/Video Space
            </div>
          </div>
          
          {/* Mobile: Reduced space for image/video */}
          <div className="lg:hidden w-full h-[250px] sm:h-[350px] md:h-[400px] flex items-center justify-center px-4">
            {/* Place hero image / mockup here later */}
            <div className="w-full h-full bg-gray-200/30 rounded-2xl flex items-center justify-center text-[#254f1a] opacity-50">
              Image/Video Space
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;