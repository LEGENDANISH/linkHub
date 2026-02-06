import React from 'react'

const Section4 = () => {
  return (
    <section className="w-full h-[100vh]  bg-[#f3f3f1] py-16 px-6 md:px-12 lg:px-20">
  
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
    
    {/* Left space */}
    <div className="hidden lg:block w-1/2"></div>

    {/* Right content */}
    <div className="w-full lg:w-1/2">
      
      {/* Heading */}
      <h2 className="text-black font-bold leading-tight mb-6
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
Analyze your audience and keep them engaged      </h2>

      {/* Paragraph */}
      <p className="text-black text-base md:text-lg font-medium">
        Connect all your content across social media, websites, stores and more in one link in bio. 
        Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.
      </p>

      {/* Button BELOW text */}
      <div className="mt-8">
        <button className="bg-[#e9c0e9] text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
          Get Started for free
        </button>
      </div>

    </div>
  </div>
</section>
  )
}

export default Section4