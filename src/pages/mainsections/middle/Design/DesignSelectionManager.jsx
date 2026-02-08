import React, { createContext, useContext, useState, useEffect } from "react";

const DesignContext = createContext();

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

export const DesignProvider = ({ children }) => {
  const [design, setDesign] = useState(() => {
    try {
      const saved = localStorage.getItem("linkhub_design");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all keys exist
        return { ...defaultDesignState, ...parsed };
      }
      return defaultDesignState;
    } catch (error) {
      console.error("Error loading design from localStorage:", error);
      return defaultDesignState;
    }
  });

  // Save to localStorage whenever design changes
  useEffect(() => {
    try {
      localStorage.setItem("linkhub_design", JSON.stringify(design));
    } catch (error) {
      console.error("Error saving design to localStorage:", error);
    }
  }, [design]);

  // Update single design property
  const updateDesign = (key, value) => {
    setDesign((prev) => ({ ...prev, [key]: value }));
  };

  // Batch update multiple design properties
  const updateDesignBatch = (updates) => {
    setDesign((prev) => ({ ...prev, ...updates }));
  };

  // Reset design to defaults
  const resetDesign = () => {
    setDesign(defaultDesignState);
  };

  // Get specific design value
  const getDesignValue = (key) => {
    return design[key];
  };

  return (
    <DesignContext.Provider
      value={{
        design,
        updateDesign,
        updateDesignBatch,
        resetDesign,
        getDesignValue,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
};