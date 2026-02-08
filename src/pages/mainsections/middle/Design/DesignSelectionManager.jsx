import React, { createContext, useContext, useState, useEffect } from "react";

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {

  const [design, setDesign] = useState(() => {
    const saved = localStorage.getItem("linkhub_design");
    return saved ? JSON.parse(saved) : {
      theme: "custom",
      backgroundColor: "#7F2AEB",
      title: "",
      titleColor: "#000000",
      pageTextColor: "#ffffff",
      buttonColor: "#E058D6",
      buttonTextColor: "#000000"
    };
  });

  useEffect(() => {
    localStorage.setItem("linkhub_design", JSON.stringify(design));
  }, [design]);

  const updateDesign = (key, value) => {
    setDesign(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DesignContext.Provider value={{ design, updateDesign }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);
