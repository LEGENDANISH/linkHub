import { useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api";

export default function AuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refresh = params.get("refresh");

    if (!token || !refresh) {
      window.location.href = "/auth";
      return;
    }

    // store tokens
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);

    // fetch user data
    fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.data));
        }

        // redirect to dashboard
        window.location.href = "/edit";
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      Signing you in...
    </div>
  );
}
