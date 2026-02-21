import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useSelection } from "../mainsections/middle/links/Selectionmanager"; // 👈 update path
import { useDesign } from "../mainsections/middle/Design/DesignSelectionManager"; // 👈 update path

function LogoutMenuItem() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // ✅ Step 1: Read userId BEFORE touching localStorage
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const userId = user?.id;

      if (userId) {
        // ✅ Step 2: Manually flush current Zustand in-memory state to localStorage
        // This guarantees the latest unsaved state is persisted before we remove 'user'.
        // Zustand's persist middleware is async and may not have written yet.
        const currentLinks = useSelection.getState().links;
        const currentDesign = useDesign.getState().design;

        localStorage.setItem(
          `Linkhub_links_data_${userId}`,
          JSON.stringify({ state: { links: currentLinks }, version: 0 })
        );

        localStorage.setItem(
          `linkhub_design_${userId}`,
          JSON.stringify({ state: { design: currentDesign }, version: 0 })
        );

        console.log("💾 Flushed state to localStorage for user:", userId);
      }
 useSubscription.getState().reset();
      localStorage.removeItem("linkhub_subscription");

      // ✅ Step 3: Remove ONLY auth — keyed data is now safely written above
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/login", { replace: true });
    } catch (e) {
      console.error("Logout error:", e);
      // Still navigate even if flush fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  };

  return (
    <MenuItem
      icon={<LogOut className="w-5 h-5" />}
      text="Log out"
      onClick={handleLogout}
    />
  );
}

export default LogoutMenuItem;