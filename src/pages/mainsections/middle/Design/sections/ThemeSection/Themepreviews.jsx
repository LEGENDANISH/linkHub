import React from "react";

export const GradientPreview = ({ theme }) => (
  <div
    className="w-full h-full relative"
    style={{
      background: theme.settings.gradientColor 
        ? `linear-gradient(135deg, ${theme.settings.backgroundColor} 0%, ${theme.settings.gradientColor} 100%)`
        : theme.settings.backgroundColor,
    }}
  >
    {/* Mock profile and buttons */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
      <div 
        className="w-10 h-10 rounded-full border border-white/50"
        style={{ 
          backgroundColor: theme.settings.buttonStyle === "glass" 
            ? "rgba(255, 255, 255, 0.2)" 
            : "rgba(255, 255, 255, 0.3)",
          backdropFilter: theme.settings.buttonStyle === "glass" ? "blur(10px)" : "none"
        }}
      />
      <div className="w-full max-w-[80%] space-y-1.5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`h-6 border ${
              theme.settings.buttonStyle === "outline" 
                ? "bg-transparent border-white/50" 
                : "bg-white/30 border-white/50"
            }`}
            style={{
              borderRadius: theme.settings.cornerRoundness === "full" 
                ? "9999px" 
                : theme.settings.cornerRoundness === "rounder" 
                ? "1rem" 
                : theme.settings.cornerRoundness === "square" 
                ? "0" 
                : "0.5rem",
              backdropFilter: theme.settings.buttonStyle === "glass" ? "blur(10px)" : "none",
            }}
          />
        ))}
      </div>
    </div>
    
    {/* Noise overlay */}
    {theme.settings.noise && (
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    )}
  </div>
);

export const PatternPreview = ({ theme }) => (
  <div
    className="w-full h-full relative"
    style={{ backgroundColor: theme.settings.backgroundColor }}
  >
    {/* Pattern overlay */}
    {theme.settings.pattern === "grid" && (
      <div className="absolute inset-0 grid grid-cols-6 gap-1 p-2 opacity-30">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{ backgroundColor: theme.settings.gradientColor }}
          />
        ))}
      </div>
    )}
    
    {theme.settings.pattern === "matrix" && (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              ${theme.settings.gradientColor} 0px,
              ${theme.settings.gradientColor} 1px,
              transparent 1px,
              transparent 15px
            ),
            repeating-linear-gradient(
              0deg,
              ${theme.settings.gradientColor} 0px,
              ${theme.settings.gradientColor} 1px,
              transparent 1px,
              transparent 15px
            )
          `,
        }}
      />
    )}

    {theme.settings.pattern === "morph" && (
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              background: theme.settings.gradientColor,
              borderRadius: "40% 60% 70% 30% / 60% 30% 70% 40%",
              opacity: 0.4 - i * 0.15,
            }}
          />
        ))}
      </div>
    )}

    {theme.settings.pattern === "organic" && (
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" fill="none">
        {[...Array(3)].map((_, i) => (
          <path
            key={i}
            d={`M${20 + i * 15},${30 + i * 20} Q${40 + i * 10},${20 + i * 15} ${60 + i * 10},${40 + i * 20}`}
            stroke={theme.settings.gradientColor}
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>
    )}

    {/* Mock UI */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
      <div 
        className="w-10 h-10 rounded-full"
        style={{ 
          backgroundColor: theme.settings.buttonStyle === "glass" 
            ? "rgba(255, 255, 255, 0.15)" 
            : "rgba(255, 255, 255, 0.25)",
          backdropFilter: theme.settings.buttonStyle === "glass" ? "blur(10px)" : "none"
        }}
      />
      <div className="w-full max-w-[80%] space-y-1.5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`h-6 ${
              theme.settings.buttonStyle === "outline" 
                ? "bg-transparent border-2" 
                : ""
            }`}
            style={{
              backgroundColor: theme.settings.buttonStyle === "outline" 
                ? "transparent" 
                : theme.settings.buttonStyle === "glass"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.25)",
              borderColor: theme.settings.buttonStyle === "outline" 
                ? theme.settings.gradientColor 
                : "transparent",
              borderRadius: theme.settings.cornerRoundness === "full" 
                ? "9999px" 
                : theme.settings.cornerRoundness === "rounder" 
                ? "1rem" 
                : theme.settings.cornerRoundness === "square" 
                ? "0" 
                : "0.5rem",
              backdropFilter: theme.settings.buttonStyle === "glass" ? "blur(10px)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const BlurPreview = ({ theme }) => (
  <div
    className="w-full h-full relative"
    style={{ backgroundColor: theme.settings.backgroundColor }}
  >
    {/* Blur effect simulation */}
    <div 
      className="absolute inset-0"
      style={{
        backdropFilter: "blur(20px)",
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%)",
      }}
    />
    
    {/* Mock UI */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
      <div 
        className="w-10 h-10 rounded-full border border-white/30"
        style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)"
        }}
      />
      <div className="w-full max-w-[80%] space-y-1.5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-6 border border-white/30"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "1rem",
              backdropFilter: "blur(10px)",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const VideoPreview = ({ theme }) => (
  <div className="w-full h-full relative overflow-hidden">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={theme.videoUrl} type="video/mp4" />
    </video>
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20" />
    
    {/* Mock UI */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
      <div 
        className="w-10 h-10 rounded-full border border-white/50"
        style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)"
        }}
      />
      <div className="w-full max-w-[80%] space-y-1.5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-6 border border-white/50"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: theme.settings.cornerRoundness === "full" ? "9999px" : "1rem",
              backdropFilter: "blur(10px)",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);