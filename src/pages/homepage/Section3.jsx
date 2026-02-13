import React from 'react';

const Section3 = () => {
  return (
    <div className="w-full bg-[#780016]">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-0">
        
        {/* Left section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 lg:pr-8 xl:pr-12">
          
          {/* Heading */}
          <h1 className="text-[#e9c0e9] font-extrabold mb-4 sm:mb-6 
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight">
            Share your Linktree anywhere you like!<br className="hidden sm:block"/> 
          </h1>

          {/* Paragraph */}
          <p className="text-[#e9c0e9] text-sm sm:text-base md:text-lg font-medium max-w-xl leading-relaxed">
            Join 70M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your Instagram, TikTok,
            Twitter, YouTube and other social media profiles.
          </p>

          {/* Mobile image/video space */}
          <div className="lg:hidden w-full h-[200px] sm:h-[300px] md:h-[350px] my-6 sm:my-8 bg-white/10 rounded-2xl flex items-center justify-center text-[#e9c0e9] opacity-50">
            Image/Video Space
          </div>

          {/* Button */}
          <div className="mt-6 sm:mt-8">
            <button className="bg-[#e9c0e9] text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:opacity-90 transition text-sm sm:text-base">
              Get Started for free
            </button>
          </div>

        </div>

        {/* Right section - image/video space (Desktop only) */}
        <div className="hidden lg:flex w-1/2 items-center justify-center pl-8 xl:pl-12">
          {/* Place hero image / mockup here later */}
          <div className="w-full h-[500px] xl:h-[600px] bg-white/10 rounded-3xl flex items-center justify-center text-[#e9c0e9] opacity-50">
            Image/Video Space
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section3;