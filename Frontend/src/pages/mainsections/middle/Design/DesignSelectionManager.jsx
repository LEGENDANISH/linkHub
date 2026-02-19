import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Default design state with all possible options
const defaultDesignState = {
  profileLayout: "classic",

  // TITLE SYSTEM (backend aligned)
  titleType: "text",
  titleText: "",
  titleAlignment: "center",
  titleFontSize: "24px",
  titleFontWeight: "bold",
  titleFont: "Inter",
  titleColor: "#000000",


  // Theme
  theme: "custom",

  // Wallpaper
  wallpaperStyle: "fill",
  backgroundColor: "#7F2AEB",
  gradientStyle: "custom",
  gradientColor: "#666666",
  gradientDirection: "linear-down",
  pattern: "grid",
  imageEffect: "none",
  imageTint: 0,
  noise: false,
  backgroundImage: null,
  backgroundVideo: null,

  // Text
  pageTextFont: "Inter",
  pageTextColor: "#ffffff",

  // Buttons
  buttonColor: "#E058D6",
  buttonTextColor: "#000000",
  buttonStyle: "fill",
  cornerRoundness: "round",
  buttonShadow: "none",

  // Footer
  footerText: "",

  // Other
  accentColor: "#000000",
};

export const useDesign = create(
  persist(
    (set, get) => ({
      design: defaultDesignState,

      updateDesign: (key, value) => {
        console.log(`🔧 Zustand updateDesign called:`, key, '=', value);
        set((state) => ({
          design: {
            ...state.design,
            [key]: value,
          },
        }));
      },

      updateDesignBatch: (updates) => {
        console.log('🔧 Zustand updateDesignBatch called:', updates);
        set((state) => ({
          design: {
            ...state.design,
            ...updates,
          },
        }));
      },

      resetDesign: () =>
        set({
          design: defaultDesignState,
        }),

      getDesignValue: (key) => {
        return get().design[key];
      },
    }),
    {
      name: `linkhub_design_${JSON.parse(localStorage.getItem("user"))?.id || "guest"}`,
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        console.log("✅ Zustand design hydrated", state);
      },
    }
  )
);

// ✅ Call after localStorage.setItem('user', ...) on login
// Reads saved design for that userId and mounts it into the store.
// If userId doesn't match any saved data (new or different user) → resets to defaults.
export const rehydrateDesignForUser = (userId) => {
  try {
    const key = `linkhub_design_${userId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.design) {
        useDesign.setState({ design: parsed.state.design });
        console.log("✅ Design rehydrated for user:", userId);
        return;
      }
    }
    useDesign.setState({ design: defaultDesignState });
    console.log("ℹ️ No saved design for user:", userId, "— using defaults");
  } catch (e) {
    console.error("Failed to rehydrate design:", e);
    useDesign.setState({ design: defaultDesignState });
  }
};