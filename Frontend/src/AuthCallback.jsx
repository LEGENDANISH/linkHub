import { useEffect } from "react";
import { rehydrateLinksForUser } from './pages/mainsections/middle/links/Selectionmanager';
import { rehydrateDesignForUser } from './pages/mainsections/middle/Design/DesignSelectionManager';
import { useSubscription } from './wrapper/SubscriptionManager';

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

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);

    fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(async (data) => {
        if (data.success) {
          const user = data.data;
          localStorage.setItem("user", JSON.stringify(user));

          rehydrateLinksForUser(user.id);
          rehydrateDesignForUser(user.id);
          await useSubscription.getState().fetchSubscription();
        }

        window.location.href = "/edit";
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      Signing you in...
    </div>
  );
}