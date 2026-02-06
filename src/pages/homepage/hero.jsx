import React from "react";
import Topbar from "./component/topbar";

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-[#d2e823]">
      
      {/* Floating navbar */}
      <Topbar />

      {/* Hero content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 md:px-12 pt-28 lg:pt-0">
        
        {/* Left section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          
          {/* Heading */}
          <h1 className="text-[#254f1a] font-extrabold mb-6 
                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            A Link in bio built <br className="hidden sm:block"/> for you.
          </h1>

          {/* Paragraph */}
          <p className="text-[#254f1a] text-base md:text-lg font-medium max-w-xl">
            Join 70M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your Instagram, TikTok,
            Twitter, YouTube and other social media profiles.
          </p>

          {/* Input + Button */}
          <div className="mt-6 flex flex-col sm:flex-row w-full max-w-md">
            <input
              type="text"
              placeholder="linkhub/"
              className="px-4 py-3 bg-white rounded-2xl sm:rounded-r-none outline-none w-full"
            />
            <button className="px-6 py-3 mt-3 sm:mt-0 bg-[#254f1a] text-white rounded-2xl sm:rounded-l-none font-semibold w-full sm:w-auto">
              Get Started
            </button>
          </div>

        </div>

        {/* Right section (optional image later) */}
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          {/* Place hero image / mockup here later */}
        </div>

      </div>
    </div>
  );
};

export default Hero;
