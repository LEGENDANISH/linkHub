export function getButtonStyle(design, link) {
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