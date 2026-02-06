import React from 'react'

const Section3 = () => {
  return (
    <div>
         <div className="flex flex-col lg:flex-row bg-[#780016] items-center justify-center min-h-screen px-6 md:px-12 pt-28 lg:pt-0">
        
        {/* Left section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          
          {/* Heading */}
          <h1 className="text-[#e9c0e9] font-extrabold mb-6 
                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
             Share your Linktree anywhere you like!<br className="hidden sm:block"/> 
          </h1>

          {/* Paragraph */}
          <p className="text-[#e9c0e9] text-base md:text-lg font-medium max-w-xl">
            Join 70M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your Instagram, TikTok,
            Twitter, YouTube and other social media profiles.
          </p>

          {/* Input + Button */}
           <div className="mt-8">
        <button className="bg-[#e9c0e9] text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
          Get Started for free
        </button>
      </div>

        </div>

        {/* Right section (optional image later) */}
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          {/* Place hero image / mockup here later */}
        </div>

      </div>

    </div>
  )
}

export default Section3