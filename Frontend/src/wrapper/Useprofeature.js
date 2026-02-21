import { useState, useEffect } from "react";

/**
 * Reads the user object from localStorage and determines if the user has
 * a Pro (or higher) plan. No API call — instant, no 429s.
 *
 * Checks: user.subscription.plan.name !== "FREE"
 * and:    user.subscription.status === "ACTIVE" or "TRIALING"
 */
const useProFeature = () => {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("user") ||
        sessionStorage.getItem("user");

      if (!raw) {
        setIsPro(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(raw);

      const planName = user?.subscription?.plan?.name ?? "FREE";
      const status = user?.subscription?.status ?? "";

      const isActiveSub = ["ACTIVE", "TRIALING"].includes(status.toUpperCase());
      const isProPlan = planName.toUpperCase() !== "FREE";

      setIsPro(isActiveSub && isProPlan);
    } catch (err) {
      console.error("useProFeature: failed to parse user from storage", err);
      setIsPro(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isPro, loading };
};

export default useProFeature;