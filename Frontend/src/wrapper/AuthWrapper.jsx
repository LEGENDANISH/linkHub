import { Navigate, useLocation } from "react-router-dom";

const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken");
};

export default function AuthWrapper({ children }) {
  const location = useLocation();
  const loggedIn = isLoggedIn();

  const publicRoutes = ["/", "/login", "/auth/callback"];

  // USER LOGGED IN
  if (loggedIn) {
    // prevent going back to login/home
    if (location.pathname === "/" || location.pathname === "/login") {
      return <Navigate to="/edit" replace />;
    }
    return children;
  }

  // USER NOT LOGGED IN
  if (!loggedIn) {
    // allow public pages
    if (publicRoutes.includes(location.pathname)) {
      return children;
    }
    // block everything else
    return <Navigate to="/login" replace />;
  }

  return children;
}

