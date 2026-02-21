import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useProFeature from "./useProFeature";

/* ─────────────────────────────────────────────
   Upgrade Modal
   ───────────────────────────────────────────── */
const UpgradeModal = ({ onClose, pageMode }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✕ button — always closes the modal */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gradient header */}
        <div
          className="px-6 pt-8 pb-6 text-center"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.5 19h19l-2-9-4.5 4L12 6l-3 8L4.5 10l-2 9Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Upgrade to Pro</h2>
          <p className="mt-1 text-sm text-white/80">
            {pageMode ? "This page requires a Pro plan" : "This feature requires a Pro plan"}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <ul className="space-y-2 text-sm text-gray-600">
            {["Logo title style", "Advanced analytics", "Custom domain", "Unlimited links"].map((feat) => (
              <li key={feat} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100">
                  <svg className="h-3 w-3 text-purple-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {feat}
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            className="mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            View Plans &amp; Pricing →
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-xl py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {pageMode ? "Continue browsing" : "Maybe later"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ProGate

   PAGE MODE — shows modal on load if not Pro.
   ✕ / "Continue browsing" dismisses the modal
   but keeps the page blurred & non-interactive
   until the user upgrades.

     <Route path="/edit" element={
       <ProGate pageMode><LinkhubDashboard /></ProGate>
     } />

   ELEMENT MODE — intercepts individual button clicks.

     <ProGate updateDesign={updateDesign} designKey="titleStyle">
       <OptionButton ... />
     </ProGate>
   ───────────────────────────────────────────── */
const ProGate = ({
  children,
  updateDesign,
  designKey,
  disabled = false,
  pageMode = false,
}) => {
  const { isPro, loading } = useProFeature();

  // Page mode: modal visible by default, user can dismiss it
  const [modalDismissed, setModalDismissed] = useState(false);

  // Element mode: modal hidden until a Pro button is clicked
  const [showModal, setShowModal] = useState(false);

  const handleElementClose = useCallback(() => {
    setShowModal(false);
    if (updateDesign && designKey) {
      updateDesign(designKey, null);
    }
  }, [updateDesign, designKey]);

  /* ── PAGE MODE ── */
  if (pageMode) {
    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        </div>
      );
    }

    if (isPro) {
      // Pro user — render normally
      return <>{children}</>;
    }

    // Not Pro — always blur & disable the page
    // Modal shows on load, can be dismissed, but page stays locked
    return (
      <>
        <div style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none" }}>
          {children}
        </div>

        {/* Floating "Upgrade" pill so user can reopen modal after dismissing */}
        {modalDismissed && (
          <button
            onClick={() => setModalDismissed(false)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.5 19h19l-2-9-4.5 4L12 6l-3 8L4.5 10l-2 9Z" />
            </svg>
            Upgrade to unlock this page
          </button>
        )}

        {!modalDismissed && (
          <UpgradeModal
            onClose={() => setModalDismissed(true)}
            pageMode
          />
        )}
      </>
    );
  }

  /* ── ELEMENT MODE ── */
  const wrappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || disabled || loading || isPro) {
      return child;
    }
    return React.cloneElement(child, {
      onClick: (e) => {
        if (child.props.onClick) child.props.onClick(e);
        setShowModal(true);
      },
    });
  });

  return (
    <>
      {wrappedChildren}
      {showModal && <UpgradeModal onClose={handleElementClose} pageMode={false} />}
    </>
  );
};

export default ProGate;