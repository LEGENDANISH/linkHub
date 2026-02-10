import React from "react";

const ThemeSection = ({ state, updateDesign }) => {
  // Curated themes with distinctive aesthetics
  const customizableThemes = [
    {
      id: "custom",
      label: "Custom",
      preview: "gradient",
      settings: {
        wallpaperStyle: "fill",
        backgroundColor: "#000000",
        buttonColor: "#ffffff",
        buttonTextColor: "#000000",
        pageTextColor: "#ffffff",
        titleColor: "#ffffff",
        buttonStyle: "fill",
        cornerRoundness: "round",
        buttonShadow: "none",
        noise: false,
      }
    },
    {
      id: "agate",
      label: "Agate",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#D4A574",
        gradientColor: "#8B4513",
        gradientDirection: "radial",
        buttonColor: "#8B4513",
        buttonTextColor: "#ffffff",
        pageTextColor: "#2C1810",
        titleColor: "#2C1810",
        buttonStyle: "fill",
        cornerRoundness: "rounder",
        buttonShadow: "soft",
        noise: true,
      }
    },
    {
      id: "neon-nights",
      label: "Neon Nights",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#0a0015",
        gradientColor: "#1a0033",
        gradientDirection: "linear-down",
        buttonColor: "#ff00ff",
        buttonTextColor: "#ffffff",
        pageTextColor: "#00ffff",
        titleColor: "#ff00ff",
        buttonStyle: "outline",
        cornerRoundness: "round",
        buttonShadow: "hard",
        noise: false,
      }
    },
    {
      id: "cyberpunk",
      label: "Cyberpunk",
      preview: "pattern",
      settings: {
        wallpaperStyle: "pattern",
        backgroundColor: "#0d1117",
        pattern: "matrix",
        gradientColor: "#00ff41",
        buttonColor: "#00ff41",
        buttonTextColor: "#0d1117",
        pageTextColor: "#00ff41",
        titleColor: "#00ff41",
        buttonStyle: "fill",
        cornerRoundness: "square",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "ocean-wave",
      label: "Ocean Wave",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#0077BE",
        gradientColor: "#00C9A7",
        gradientDirection: "linear-down",
        buttonColor: "rgba(255, 255, 255, 0.2)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#ffffff",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "full",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "sunset-glow",
      label: "Sunset Glow",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#FF6B6B",
        gradientColor: "#FFE66D",
        gradientDirection: "radial",
        buttonColor: "#ffffff",
        buttonTextColor: "#FF6B6B",
        pageTextColor: "#ffffff",
        titleColor: "#ffffff",
        buttonStyle: "fill",
        cornerRoundness: "full",
        buttonShadow: "strong",
        noise: false,
      }
    },
    {
      id: "aurora",
      label: "Aurora",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#1a103d",
        gradientColor: "#a855f7",
        gradientDirection: "linear-down",
        buttonColor: "rgba(168, 85, 247, 0.3)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#e9d5ff",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "rounder",
        buttonShadow: "soft",
        noise: true,
      }
    },
    {
      id: "geometric",
      label: "Geometric",
      preview: "pattern",
      settings: {
        wallpaperStyle: "pattern",
        backgroundColor: "#1e293b",
        pattern: "grid",
        gradientColor: "#38bdf8",
        buttonColor: "#38bdf8",
        buttonTextColor: "#1e293b",
        pageTextColor: "#f1f5f9",
        titleColor: "#ffffff",
        buttonStyle: "fill",
        cornerRoundness: "round",
        buttonShadow: "none",
        noise: false,
      }
    },
  ];

  const videoThemes = [
    {
      id: "floating-bubbles",
      label: "Floating Bubbles",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2022/11/07/138197-769264329_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2022/11/07/138197-769264329_large.mp4",
        backgroundColor: "#1a1a2e",
        buttonColor: "rgba(255, 255, 255, 0.25)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#ffffff",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "full",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "cosmic-waves",
      label: "Cosmic Waves",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2021/08/03/84380-586636620_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2021/08/03/84380-586636620_large.mp4",
        backgroundColor: "#000000",
        buttonColor: "rgba(147, 51, 234, 0.4)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#e9d5ff",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "rounder",
        buttonShadow: "hard",
        noise: false,
      }
    },
    {
      id: "fire-particles",
      label: "Fire Particles",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2022/05/04/116526-706004937_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2022/05/04/116526-706004937_large.mp4",
        backgroundColor: "#1a0000",
        buttonColor: "rgba(255, 87, 51, 0.3)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#fecaca",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "full",
        buttonShadow: "hard",
        noise: false,
      }
    },
    {
      id: "northern-lights",
      label: "Northern Lights",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2022/12/05/142608-778946634_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2022/12/05/142608-778946634_large.mp4",
        backgroundColor: "#0a192f",
        buttonColor: "rgba(134, 239, 172, 0.25)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#d1fae5",
        titleColor: "#ffffff",
        buttonStyle: "glass",
        cornerRoundness: "rounder",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "neon-grid",
      label: "Neon Grid",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2022/01/18/104988-667500758_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2022/01/18/104988-667500758_large.mp4",
        backgroundColor: "#000000",
        buttonColor: "rgba(236, 72, 153, 0.3)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#fce7f3",
        titleColor: "#ec4899",
        buttonStyle: "glass",
        cornerRoundness: "round",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "liquid-gold",
      label: "Liquid Gold",
      preview: "video",
      videoUrl: "https://cdn.pixabay.com/video/2021/07/23/82747-578896226_large.mp4",
      settings: {
        wallpaperStyle: "video",
        backgroundVideo: "https://cdn.pixabay.com/video/2021/07/23/82747-578896226_large.mp4",
        backgroundColor: "#1a1100",
        buttonColor: "rgba(251, 191, 36, 0.3)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#fef3c7",
        titleColor: "#fbbf24",
        buttonStyle: "glass",
        cornerRoundness: "full",
        buttonShadow: "strong",
        noise: false,
      }
    },
  ];

  const advancedThemes = [
    {
      id: "holographic",
      label: "Holographic",
      preview: "pattern",
      settings: {
        wallpaperStyle: "pattern",
        backgroundColor: "#0a0a0a",
        pattern: "morph",
        gradientColor: "#a855f7",
        buttonColor: "rgba(168, 85, 247, 0.2)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#e9d5ff",
        titleColor: "#a855f7",
        buttonStyle: "glass",
        cornerRoundness: "rounder",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "retro-wave",
      label: "Retro Wave",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#2d1b69",
        gradientColor: "#f72585",
        gradientDirection: "linear-down",
        buttonColor: "#00f5ff",
        buttonTextColor: "#2d1b69",
        pageTextColor: "#ffd60a",
        titleColor: "#ffd60a",
        buttonStyle: "fill",
        cornerRoundness: "square",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "frosted-glass",
      label: "Frosted Glass",
      preview: "blur",
      settings: {
        wallpaperStyle: "blur",
        backgroundColor: "#e0f2fe",
        buttonColor: "rgba(255, 255, 255, 0.3)",
        buttonTextColor: "#0369a1",
        pageTextColor: "#0c4a6e",
        titleColor: "#0c4a6e",
        buttonStyle: "glass",
        cornerRoundness: "rounder",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "matrix-code",
      label: "Matrix Code",
      preview: "pattern",
      settings: {
        wallpaperStyle: "pattern",
        backgroundColor: "#000000",
        pattern: "matrix",
        gradientColor: "#00ff00",
        buttonColor: "rgba(0, 255, 0, 0.2)",
        buttonTextColor: "#00ff00",
        pageTextColor: "#00ff00",
        titleColor: "#00ff00",
        buttonStyle: "outline",
        cornerRoundness: "square",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "organic-flow",
      label: "Organic Flow",
      preview: "pattern",
      settings: {
        wallpaperStyle: "pattern",
        backgroundColor: "#1e1b4b",
        pattern: "organic",
        gradientColor: "#8b5cf6",
        buttonColor: "rgba(139, 92, 246, 0.3)",
        buttonTextColor: "#ffffff",
        pageTextColor: "#ddd6fe",
        titleColor: "#c4b5fd",
        buttonStyle: "glass",
        cornerRoundness: "full",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "cherry-blossom",
      label: "Cherry Blossom",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#fce7f3",
        gradientColor: "#ec4899",
        gradientDirection: "radial",
        buttonColor: "#be185d",
        buttonTextColor: "#ffffff",
        pageTextColor: "#831843",
        titleColor: "#9f1239",
        buttonStyle: "fill",
        cornerRoundness: "full",
        buttonShadow: "soft",
        noise: false,
      }
    },
    {
      id: "midnight-city",
      label: "Midnight City",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#0f172a",
        gradientColor: "#1e293b",
        gradientDirection: "linear-down",
        buttonColor: "#38bdf8",
        buttonTextColor: "#0f172a",
        pageTextColor: "#cbd5e1",
        titleColor: "#38bdf8",
        buttonStyle: "fill",
        cornerRoundness: "round",
        buttonShadow: "hard",
        noise: true,
      }
    },
    {
      id: "tropical-paradise",
      label: "Tropical Paradise",
      preview: "gradient",
      settings: {
        wallpaperStyle: "gradient",
        backgroundColor: "#064e3b",
        gradientColor: "#10b981",
        gradientDirection: "radial",
        buttonColor: "#fbbf24",
        buttonTextColor: "#064e3b",
        pageTextColor: "#d1fae5",
        titleColor: "#fef3c7",
        buttonStyle: "fill",
        cornerRoundness: "rounder",
        buttonShadow: "strong",
        noise: false,
      }
    },
  ];

  const [activeTab, setActiveTab] = React.useState("customizable");

  const applyTheme = (theme) => {
    console.log("🎨 Applying theme:", theme.id, theme.settings);
    
    // Apply all theme settings
    Object.entries(theme.settings).forEach(([key, value]) => {
      updateDesign(key, value);
    });
    
    // Set theme ID
    updateDesign("theme", theme.id);
  };

  const ThemeCard = ({ theme, isSelected }) => (
    <div
      onClick={() => applyTheme(theme)}
      className={`rounded-2xl border-2 bg-white cursor-pointer transition-all hover:shadow-lg relative overflow-hidden group ${
        isSelected
          ? "border-black ring-2 ring-black"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Preview */}
      <div className="h-32 relative overflow-hidden">
        {theme.preview === "gradient" && (
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
        )}

        {theme.preview === "pattern" && (
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
        )}

        {theme.preview === "blur" && (
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
        )}

        {theme.preview === "video" && (
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
        )}

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      {/* Label */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-800">{theme.label}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Themes</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("customizable")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "customizable"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Customizable
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "video"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Video Backgrounds
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "advanced"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Theme grid */}
      {activeTab === "customizable" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {customizableThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={state.theme === theme.id}
            />
          ))}
        </div>
      )}

      {activeTab === "video" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {videoThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={state.theme === theme.id}
              />
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-purple-900 mb-1">
                  Animated Video Backgrounds
                </p>
                <p className="text-xs text-purple-700">
                  These themes feature stunning video backgrounds with glass-morphism buttons for a premium, modern look.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "advanced" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {advancedThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={state.theme === theme.id}
              />
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-indigo-900 mb-1">
                  Advanced Patterns & Effects
                </p>
                <p className="text-xs text-indigo-700">
                  Explore unique designs with animated patterns, morphing shapes, and custom CSS effects for a truly distinctive look.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSection;