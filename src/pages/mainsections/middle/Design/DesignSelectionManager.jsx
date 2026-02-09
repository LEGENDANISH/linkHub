import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  wallpaper: "fill",
  backgroundColor: "#7F2AEB",
  
  // Text
  pageTextColor: "#ffffff",
  
  // Buttons
  buttonColor: "#E058D6",
  buttonTextColor: "#000000",
  buttonStyle: "rounded",
  buttonShadow: false,
  
  // Footer
  footerText: "",
  
  // Colors (additional)
  accentColor: "#000000",
};

export const useDesign = create(
  persist(
    (set, get) => ({
      design: defaultDesignState,

      // Update single design property
      updateDesign: (key, value) =>
        set((state) => ({
          design: {
            ...state.design,
            [key]: value,
          },
        })),

      // Batch update multiple design properties
      updateDesignBatch: (updates) =>
        set((state) => ({
          design: {
            ...state.design,
            ...updates,
          },
        })),

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
      name: 'linkhub_design', // localStorage key (same as your original)
    }
  )
);