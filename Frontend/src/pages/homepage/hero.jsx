import React from "react";
import Topbar from "../component/topbar";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

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
            A Link in bio built <br className="hidden sm:block" /> for you.
          </h1>

          {/* Paragraph */}
          <p className="text-[#254f1a] text-sm sm:text-base md:text-lg font-medium max-w-xl mb-6">
            Join 70M+ people using Linkhub for their link in bio. One link to help you
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

            <button
              onClick={() => navigate("/onboard")}
              className="px-6 py-3 mt-3 sm:mt-0 bg-[#254f1a] text-white rounded-2xl sm:rounded-l-none font-semibold w-full sm:w-auto text-sm sm:text-base hover:opacity-90 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right section - image/video */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex items-center justify-center">
          
          <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px] flex items-center justify-center px-4">
            <div className="w-full h-full bg-gray-200/30 rounded-3xl flex items-center justify-center">
              
            <video
  src="/Q1.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-contain rounded-3xl"
>
  Your browser does not support the video tag.
</video>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;
