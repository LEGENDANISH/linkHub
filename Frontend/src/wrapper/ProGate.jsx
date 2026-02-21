// ProWrapper.jsx
// Drop this around ANY button/option that needs Pro gating.
// Reads subscription from Zustand (localStorage) — no API call on every render.
//
// Usage:
//   <ProWrapper>
//     <WallpaperStyleOption isPro={true} ... />
//   </ProWrapper>
//
// If child doesn't have isPro, ProWrapper is a transparent passthrough.

import React, { useState, useEffect, useRef } from 'react';
import { useSubscription } from './SubscriptionManager';

// ─── Upgrade Modal ────────────────────────────────────────────────────────────
const UpgradeModal = ({ onClose, featureLabel }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15,10,30,0.55)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'fadeIn 0.18s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>

      <div style={{
        background: '#fff', borderRadius: 20, padding: '36px 32px 28px',
        maxWidth: 380, width: '100%', position: 'relative',
        boxShadow: '0 24px 60px rgba(80,20,180,0.22)',
        animation: 'slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14, width: 30, height: 30,
          borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.06)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 16, margin: '0 auto 18px',
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20M4 20l2-8 6 4 6-4 2 8"/>
            <circle cx="12" cy="8" r="2"/>
          </svg>
        </div>

        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, textAlign: 'center', color: '#18112e' }}>
          Upgrade to Pro
        </h2>
        {featureLabel && (
          <p style={{ margin: '8px 0 0', fontSize: 13, textAlign: 'center', color: '#a78bca' }}>
            <span style={{ fontWeight: 600, color: '#7c3aed' }}>{featureLabel}</span> is a Pro feature.
          </p>
        )}

        <ul style={{ margin: '20px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Logo & custom title styles', 'Advanced wallpaper & image effects', 'Premium button styles', 'Priority support'].map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#3d2d6e' }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 4.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {f}
            </li>
          ))}
        </ul>

        <a href="/pricing" style={{
          display: 'block', width: '100%', padding: '13px 0', borderRadius: 12,
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          color: '#fff', fontSize: 14, fontWeight: 700, textAlign: 'center',
          textDecoration: 'none', boxShadow: '0 6px 20px rgba(124,58,237,0.38)',
        }}>
          Upgrade Now ✦
        </a>

        <p style={{ margin: '12px 0 0', fontSize: 11, textAlign: 'center', color: '#c4b5d8' }}>
          Cancel anytime · No hidden fees
        </p>
      </div>
    </div>
  );
};

// ─── ProWrapper ───────────────────────────────────────────────────────────────
/**
 * @param {React.ReactNode} children   — your button/option component
 * @param {string}          label      — shown in modal: "Image wallpaper is a Pro feature"
 *
 * ProWrapper reads `isPro` prop off the child automatically.
 * If child has no isPro prop, or user IS Pro → renders child untouched.
 */
const ProWrapper = ({ children, label }) => {
  const isProUser = useSubscription((s) => s.isPro());
  const [open, setOpen] = useState(false);

  // Read isPro off the child's props
  const child = React.Children.only(children);
  const isProFeature = child?.props?.isPro === true;

  // Not a Pro feature, or user already is Pro → passthrough
  if (!isProFeature || isProUser) return <>{children}</>;

  return (
    <>
      <div
        style={{ position: 'relative', display: 'inline-block', width: '100%' }}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
      >
        {/* Dim the locked child */}
        <div style={{ opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
          {children}
        </div>

        {/* PRO badge */}
        <div style={{
          position: 'absolute', top: 6, right: 6,
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
          padding: '2px 7px', borderRadius: 6,
          boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
          pointerEvents: 'none',
        }}>
          PRO
        </div>

        {/* Lock icon */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
        </div>
      </div>

      {open && <UpgradeModal featureLabel={label} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ProWrapper;