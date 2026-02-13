import React from "react";

const Section5 = () => {
  return (
    <section className="bg-[#E9C0E9] w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#502274] leading-tight">
            Your growth starts here.
          </h1>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#502274] mt-4 sm:mt-6 leading-relaxed px-2">
            Manage your entire online following on Linktree. Schedule your social posts, grow
            your email list, track visitors and get even more followers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 md:mt-16">

          {/* Card 1 */}
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col">
            {/* Image space */}
            <div className="h-[180px] sm:h-[200px] lg:h-[220px] w-full rounded-xl sm:rounded-2xl bg-gray-100 mb-6 sm:mb-8 flex items-center justify-center text-gray-400 text-sm">
              Image here
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">
              Stay consistent on social
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Schedule social posts to go live across platforms and never miss a posting day again.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col">
            {/* Image space */}
            <div className="h-[180px] sm:h-[200px] lg:h-[220px] w-full rounded-xl sm:rounded-2xl bg-gray-100 mb-6 sm:mb-8 flex items-center justify-center text-gray-400 text-sm">
              Image here
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">
              Grow your email list
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Collect emails on your Linktree so you can stay connected on and off social platforms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col md:col-span-2 lg:col-span-1">
            {/* Image space */}
            <div className="h-[180px] sm:h-[200px] lg:h-[220px] w-full rounded-xl sm:rounded-2xl bg-gray-100 mb-6 sm:mb-8 flex items-center justify-center text-gray-400 text-sm">
              Image here
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">
              Use insights to optimize
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Get deep insights into your audience and optimize your Linktree for more clicks and engagement.
            </p>
          </div>

          {/* Center Button - spans full width on mobile, centered on larger screens */}
          <div className="col-span-full flex items-center justify-center mt-4 sm:mt-6 md:mt-8">
            <button className="bg-[#502274] hover:bg-[#e2b3e2] transition-colors px-12 sm:px-16 md:px-20 py-4 sm:py-5 md:py-6 lg:py-7 rounded-full text-sm sm:text-base lg:text-lg font-semibold text-white w-full sm:w-auto max-w-sm sm:max-w-none">
              Get in touch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section5;