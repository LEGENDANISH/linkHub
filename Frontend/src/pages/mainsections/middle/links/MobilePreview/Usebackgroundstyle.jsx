import { useMemo } from "react";

export function useBackgroundStyle(design) {
  return useMemo(() => {
    const baseStyle = {
      color: design.pageTextColor || "#ffffff",
      position: "relative",
      overflow: "hidden",
    };

    const wallpaperStyle = design.wallpaperStyle || "fill";

    console.log("🖼️ Generating background for:", wallpaperStyle);

    // Apply wallpaper style
    if (wallpaperStyle === "fill") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else if (wallpaperStyle === "gradient") {
      const bgColor = design.backgroundColor || "#000000";
      const gradColor = design.gradientColor || "#666666";
      const direction = design.gradientDirection || "linear-down";
      
      if (direction === "linear-up") {
        baseStyle.background = `linear-gradient(to top, ${bgColor}, ${gradColor})`;
      } else if (direction === "linear-down") {
        baseStyle.background = `linear-gradient(to bottom, ${bgColor}, ${gradColor})`;
      } else if (direction === "radial") {
        baseStyle.background = `radial-gradient(circle, ${bgColor}, ${gradColor})`;
      } else {
        baseStyle.background = `linear-gradient(to bottom, ${bgColor}, ${gradColor})`;
      }
    } else if (wallpaperStyle === "blur") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else if (wallpaperStyle === "pattern") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else if (wallpaperStyle === "image") {
      if (design.backgroundImage) {
        baseStyle.backgroundImage = `url(${design.backgroundImage})`;
        baseStyle.backgroundSize = "cover";
        baseStyle.backgroundPosition = "center";
        baseStyle.backgroundRepeat = "no-repeat";
      } else {
        baseStyle.backgroundColor = design.backgroundColor || "#000000";
      }
    } else if (wallpaperStyle === "video") {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    } else {
      baseStyle.backgroundColor = design.backgroundColor || "#000000";
    }

    return baseStyle;
  }, [
    design.wallpaperStyle,
    design.backgroundColor,
    design.gradientColor,
    design.gradientDirection,
    design.backgroundImage,
    design.pageTextColor,
  ]);
}