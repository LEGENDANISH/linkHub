import React from "react";

export function BackgroundLayers({ design, videoRef }) {
  return (
    <>
      {/* Background Video Layer */}
      {design.wallpaperStyle === "video" && design.backgroundVideo && (
        <video
          ref={videoRef}
          key={design.backgroundVideo}
          className="absolute inset-0 w-full h-full object-cover rounded-[30px] z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={design.backgroundVideo} />
        </video>
      )}

      {/* Blur Effect Layer */}
      {design.wallpaperStyle === "blur" && (
        <div 
          className="absolute inset-0 z-0 rounded-[30px]"
          style={{
            backgroundColor: design.backgroundColor || "#000000",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%)`,
            }}
          />
        </div>
      )}

      {/* Pattern Layer */}
      {design.wallpaperStyle === "pattern" && design.pattern && (
        <div className="absolute inset-0 pointer-events-none z-0 rounded-[30px] overflow-hidden">
          {design.pattern === "grid" && (
            <div className="w-full h-full grid grid-cols-8 gap-2 p-4 opacity-20">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className="border-2 rounded"
                  style={{ borderColor: design.gradientColor || "#666666" }}
                />
              ))}
            </div>
          )}
          {design.pattern === "morph" && (
            <div className="w-full h-full flex items-center justify-center opacity-30 relative">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    background: design.gradientColor || "#666666",
                    borderRadius: "40% 60% 70% 30% / 60% 30% 70% 40%",
                    opacity: 0.3 - i * 0.1,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
            </div>
          )}
          {design.pattern === "organic" && (
            <svg
              className="w-full h-full opacity-20"
              viewBox="0 0 280 560"
              fill="none"
              preserveAspectRatio="none"
            >
              {[...Array(5)].map((_, i) => (
                <path
                  key={i}
                  d={`M${50 + i * 40},${100 + i * 60} Q${100 + i * 20},${
                    50 + i * 40
                  } ${150 + i * 30},${120 + i * 50} T${200 + i * 20},${
                    200 + i * 70
                  }`}
                  stroke={design.gradientColor || "#666666"}
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </svg>
          )}
          {design.pattern === "matrix" && (
            <div
              className="w-full h-full opacity-30"
              style={{
                background: `
                  repeating-linear-gradient(
                    90deg,
                    ${design.gradientColor || "#666666"} 0px,
                    ${design.gradientColor || "#666666"} 1px,
                    transparent 1px,
                    transparent 20px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    ${design.gradientColor || "#666666"} 0px,
                    ${design.gradientColor || "#666666"} 1px,
                    transparent 1px,
                    transparent 20px
                  )
                `,
              }}
            />
          )}
        </div>
      )}

      {/* Image Effects Layer */}
      {design.wallpaperStyle === "image" && design.backgroundImage && (
        <div className="absolute inset-0 pointer-events-none rounded-[30px] overflow-hidden z-0">
          {design.imageEffect === "mono" && (
            <div className="absolute inset-0 bg-black opacity-40 mix-blend-saturation" 
                 style={{ filter: "grayscale(100%)" }} />
          )}
          {design.imageEffect === "blur" && (
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))`,
              }}
            />
          )}
          {design.imageEffect === "halftone" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
                backgroundSize: "4px 4px",
                mixBlendMode: "overlay",
              }}
            />
          )}
          {/* Tint overlay */}
          {(design.imageTint || 0) > 0 && (
            <div
              className="absolute inset-0"
              style={{
                background: `rgba(0, 0, 0, ${(design.imageTint || 0) / 100})`,
              }}
            />
          )}
        </div>
      )}

      {/* Noise Layer */}
      {design.noise && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10 z-[5] rounded-[30px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      )}
    </>
  );
}