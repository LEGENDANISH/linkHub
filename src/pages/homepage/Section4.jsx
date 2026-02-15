import React from "react";
import { useNavigate } from "react-router-dom";

const Section4 = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen bg-[#f3f3f1] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[calc(100vh-8rem)] lg:min-h-screen">
        
        {/* Left space - image/video area (Desktop only) */}
        <div className="hidden lg:flex w-1/2 items-center justify-center pr-8 xl:pr-12">
          <div className="w-full h-[500px] xl:h-[600px] rounded-3xl overflow-hidden">
            <img
              src="/Q4.png"
              alt="Analytics preview"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* Right content */}
        <div className="w-full lg:w-1/2">
          
          {/* Heading */}
          <h2 className="text-black font-bold leading-tight mb-4 sm:mb-6
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Analyze your audience and keep them engaged
          </h2>

          {/* Paragraph */}
          <p className="text-black text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            Connect all your content across social media, websites, stores and more in one link in bio. 
            Customize every detail or let Linkhub automatically enhance it to match your brand and drive more clicks.
          </p>

          {/* Mobile image/video space */}
          <div className="lg:hidden w-full h-[200px] sm:h-[300px] md:h-[350px] my-6 sm:my-8 rounded-2xl overflow-hidden">
            <img
              src="/Q4.png"
              alt="Analytics preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Button BELOW text */}
          <div className="mt-6 sm:mt-8">
            <button
            onClick={() => navigate("/onboard")}
            className="bg-[#e9c0e9] text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:opacity-90 transition text-sm sm:text-base">
              Get Started for free
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section4;
