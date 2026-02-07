import React from "react";

const Section5 = () => {
  return (
    <section className="bg-[#E9C0E9] w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#502274]">
            Your growth starts here.
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#502274] mt-6 leading-relaxed">
            Manage your entire online following on Linktree. Schedule your social posts, grow
            your email list, track visitors and get even more followers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          {/* Card 1 */}
          <div className="bg-white rounded-[2.5rem] p-8 flex flex-col">
            <div className="h-[220px] w-full rounded-2xl bg-gray-100 mb-8 flex items-center justify-center text-gray-400">
              Image here
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Stay consistent on social
            </h3>

            <p className="text-gray-600 text-base leading-relaxed">
              Schedule social posts to go live across platforms and never miss a posting day again.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[2.5rem] p-8 flex flex-col">
            <div className="h-[220px] w-full rounded-2xl bg-gray-100 mb-8 flex items-center justify-center text-gray-400">
              Image here
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Grow your email list
            </h3>

            <p className="text-gray-600 text-base leading-relaxed">
              Collect emails on your Linktree so you can stay connected on and off social platforms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[2.5rem] p-8 flex flex-col">
            <div className="h-[220px] w-full rounded-2xl bg-gray-100 mb-8 flex items-center justify-center text-gray-400">
              Image here
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Use insights to optimize
            </h3>

            <p className="text-gray-600 text-base leading-relaxed">
              Get deep insights into your audience and optimize your Linktree for more clicks and engagement.
            </p>
          </div>

          {/* Center Button */}
          <div className="col-span-full flex items-center justify-center">
            <button className="bg-[#502274] hover:bg-[#e2b3e2] transition-colors px-20 py-7 rounded-full text-base sm:text-lg font-semibold text-white whitespace-nowrap">
              Get in touch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section5;
