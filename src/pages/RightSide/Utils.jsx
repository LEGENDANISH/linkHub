/**
 * Get button style based on design settings
 */
export function getButtonStyle(design) {
  const baseStyle = {
    backgroundColor:
      design.buttonStyle === "outline" ? "transparent" : design.buttonColor || "#000000",
    color: design.buttonTextColor || "#ffffff",
    border:
      design.buttonStyle === "outline"
        ? `2px solid ${design.buttonColor || "#000000"}`
        : "none",
  };

  const cornerRoundness = {
    square: "0px",
    round: "0.5rem",
    rounder: "1rem",
    full: "9999px",
  };

  baseStyle.borderRadius = cornerRoundness[design.cornerRoundness] || "0.5rem";

  const shadows = {
    none: "none",
    soft: "0 1px 3px rgba(0,0,0,0.1)",
    strong: "0 4px 6px rgba(0,0,0,0.1)",
    hard: "0 10px 15px rgba(0,0,0,0.2)",
  };

  baseStyle.boxShadow = shadows[design.buttonShadow] || "none";

  if (design.buttonStyle === "glass") {
    baseStyle.background = "rgba(255,255,255,0.1)";
    baseStyle.backdropFilter = "blur(10px)";
    baseStyle.border = "1px solid rgba(255,255,255,0.2)";
  }

  return baseStyle;
}

/**
 * Get cropped image style
 */
export function getCroppedImageStyle(crop) {
  if (!crop) return {};
  
  const { x, y, scale } = crop;
  return {
    transform: `translate(${-x}px, ${-y}px) scale(${scale})`,
    transformOrigin: '0 0'
  };
}

/**
 * Get favicon/icon for auto icon type
 */
export function getAutoIcon(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

/**
 * Get title style
 */
export function getTitleStyle(design) {
  return {
    color: design.titleColor || "#ffffff",
    fontSize:
      design.titleSize === "small"
        ? "1.125rem"
        : design.titleSize === "large"
        ? "2rem"
        : "1.5rem",
    fontFamily: design.titleFont || "Inter",
  };
}

/**
 * Get profile size class
 */
export function getProfileSizeClass(design) {
  return design.titleSize === "small"
    ? "w-16 h-16"
    : design.titleSize === "large"
    ? "w-24 h-24"
    : "w-20 h-20";
}