import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Default design state with all possible options
const defaultDesignState = {
  // Header
  profileImage: null,
  profileLayout: "classic",
  title: "",
  titleStyle: "text",
  titleSize: "small",
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

      // Update single design property
      updateDesign: (key, value) => {
        console.log(`🔧 Zustand updateDesign called:`, key, '=', value);
        set((state) => ({
          design: {
            ...state.design,
            [key]: value,
          },
        }));
      },

      // Batch update multiple design properties
      updateDesignBatch: (updates) => {
        console.log('🔧 Zustand updateDesignBatch called:', updates);
        set((state) => ({
          design: {
            ...state.design,
            ...updates,
          },
        }));
      },

      // Reset design to defaults
      resetDesign: () =>
        set({
          design: defaultDesignState,
        }),

      // Get specific design value
      getDesignValue: (key) => {
        return get().design[key];
      },
    }),
    {
      name: 'linkhub_design',
      storage: createJSONStorage(() => localStorage), // ← THIS WAS MISSING!
    }
  )
);