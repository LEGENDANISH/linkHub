import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AuthWrapper from "./wrapper/AuthWrapper";

// Pages
import Hero from "./pages/homepage/hero";
import Section2 from "./pages/homepage/Section2";
import Section3 from "./pages/homepage/Section3";
import Section4 from "./pages/homepage/Section4";
import Section5 from "./pages/homepage/Section5";
import Pricing from "./pages/Pricing/Pricing";
import LinkhubDashboard from "./pages/mainsections/base/Linkhubdashboard";
import SubscriptionSuccess from "./pages/Pricing/Subscriptionsuccess";
import SubscriptionCancel from "./pages/Pricing/Subscriptioncancel";
import SubscriptionManagement from "./pages/Pricing/Subscriptionmanagement";
import AuthPage from "./Authpage";
import AuthCallback from "./AuthCallback";
import OnboardingFlow from "./pages/startingpages/Q";
import AccountPage from "./Account/Account";
import UpgradeModal from "./pages/component/UpgradeModal";
import Test from "./Test";

function HomePage() {
  return (
    <>
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Pricing />
      <Section5 />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <UpgradeModal />

      <AuthWrapper>
        <Routes>



<Route path="/cards/:slug" element={<Test />} />



          {/* Public homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Dashboard */}
          <Route path="/edit" element={<LinkhubDashboard />} />

          {/* Onboarding */}
          <Route path="/onboard" element={<OnboardingFlow />} />

          {/* Auth */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Account */}
          <Route path="/account" element={<AccountPage />} />

          {/* Pricing */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess />} />
          <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
          <Route path="/subscription" element={<SubscriptionManagement />} />

        </Routes>
      </AuthWrapper>

    </BrowserRouter>
  </StrictMode>
);
