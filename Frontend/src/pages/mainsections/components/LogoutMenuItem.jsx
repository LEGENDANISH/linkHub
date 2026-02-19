import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function LogoutMenuItem() {
  const navigate = useNavigate();

  const handleLogout = () => {
  try {
    // SAVE DRAFT FIRST
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const linksData = localStorage.getItem("Linkhub_links_data");
    const designData = localStorage.getItem("linkhub_design");

    if (userId && (linksData || designData)) {
      localStorage.setItem(
        `linkhub_draft_${userId}`,
        JSON.stringify({
          links: linksData,
          design: designData,
          savedAt: new Date().toISOString()
        })
      );
    }

    // REMOVE ONLY AUTH DATA
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // DO NOT clear whole storage
    // ❌ localStorage.clear()
    // ❌ sessionStorage.clear()

    navigate("/login", { replace: true });

    window.location.reload();
  } catch (e) {
    console.error(e);
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
