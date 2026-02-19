import { useState, useEffect } from "react";
import { FiUser, FiLock, FiZap, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

// Utility: get token from localStorage
const getToken = () => localStorage.getItem("accessToken") || "";

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
    ...options,
  });
  return res.json();
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Avatar({ src, name, size = "lg" }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "??";
  const sizeClass = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";
  return !imgError && src ? (
    <img
      src={src.trim()}
      alt={name}
      onError={() => setImgError(true)}
      className={`${sizeClass} rounded-2xl object-cover ring-4 ring-purple-100`}
    />
  ) : (
    <div
      className={`${sizeClass} rounded-2xl flex items-center justify-center font-bold text-white`}
      style={{ background: "linear-gradient(135deg,#8200DB,#b44dff)" }}
    >
      {initials}
    </div>
  );
}

function Badge({ children, variant = "pro" }) {
  const styles = {
    pro: "bg-purple-100 text-purple-700 border border-purple-200",
    active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    canceled: "bg-red-50 text-red-600 border border-red-200",
    trial: "bg-amber-50 text-amber-700 border border-amber-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[variant] || styles.pro}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange, placeholder, disabled }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm
          focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-400 transition-all"
      />
    </div>
  );
}

function PrimaryButton({ children, onClick, loading, type = "button", className = "", danger }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
        transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
        ${danger
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "text-white hover:opacity-90"
        } ${className}`}
      style={!danger ? { background: "#8200DB" } : undefined}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200
        hover:bg-[#F3E8FF] hover:text-purple-700 hover:border-purple-200 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

function NavItem({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
        ${active
          ? "bg-[#F3E8FF] text-purple-700"
          : "text-gray-500 hover:bg-[#F3E8FF] hover:text-purple-700"
        }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium
        ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-500 text-white"}`}
    >
      <span>{type === "success" ? "✓" : "✕"}</span>
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

function FeatureRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      {typeof value === "boolean" ? (
        value
          ? <span className="text-emerald-500 font-semibold text-base">✓</span>
          : <span className="text-gray-300 font-semibold text-base">✕</span>
      ) : (
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      )}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function ProfileSection({ user, onToast }) {
  const [form, setForm] = useState({ name: user.name || "", username: user.username || "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    const res = await apiFetch("/auth/update", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.success) onToast("Profile updated successfully!", "success");
    else onToast(res.message || "Update failed.", "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your public identity</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-50">
          <Avatar src={user.profile?.profileImage || user.image} name={user.name} />
          <div>
            <p className="font-bold text-gray-900 text-lg">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="pro">{user.subscription?.plan?.displayName || "Free"}</Badge>
              <Badge variant={user.subscription?.status === "ACTIVE" ? "active" : "canceled"}>
                {user.subscription?.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Display Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} placeholder="username" />
          <Input label="Email" name="email" value={user.email} disabled />
          <Input label="Profile Slug" name="slug" value={user.profile?.slug || ""} disabled />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <GhostButton onClick={() => setForm({ name: user.name, username: user.username })}>Reset</GhostButton>
          <PrimaryButton onClick={handleSave} loading={loading}>Save Changes</PrimaryButton>
        </div>
      </Card>

      {user.profile?.bio !== undefined && (
        <Card className="p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bio</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all resize-none"
              defaultValue={user.profile.bio || ""}
              placeholder="Tell the world who you are..."
            />
          </div>
        </Card>
      )}
    </div>
  );
}

function SecuritySection({ onToast }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleChange_ = async () => {
    if (form.newPassword !== form.confirmPassword) {
      onToast("Passwords do not match.", "error"); return;
    }
    if (form.newPassword.length < 8) {
      onToast("Password must be at least 8 characters.", "error"); return;
    }
    setLoading(true);
    const res = await apiFetch("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    });
    setLoading(false);
    if (res.success) {
      onToast("Password changed!", "success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      onToast(res.message || "Failed to change password.", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-1">Keep your account safe</p>
      </div>
      <Card className="p-6 space-y-4">
        <Input label="Current Password" name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} placeholder="••••••••" />
        <Input label="New Password" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} placeholder="Min. 8 characters" />
        <Input label="Confirm New Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat new password" />
        <div className="flex justify-end mt-2">
          <PrimaryButton onClick={handleChange_} loading={loading}>Update Password</PrimaryButton>
        </div>
      </Card>
    </div>
  );
}

function SubscriptionSection({ user, onToast }) {
  const [history, setHistory] = useState(null);
  const [features, setFeatures] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const sub = user.subscription;
  const plan = sub?.plan;
const navigate = useNavigate()
  useEffect(() => {
    apiFetch("/subscriptions/payment-history").then((r) => r.success && setHistory(r.data));
    apiFetch("/subscriptions/features").then((r) => r.success && setFeatures(r.data));
  }, []);

  const handleCancel = async () => {
    if (!confirm("Cancel your subscription? You'll lose access at the end of the billing period.")) return;
    setCancelLoading(true);
    const res = await apiFetch("/subscriptions/cancel", { method: "PUT" });
    setCancelLoading(false);
    if (res.success) onToast("Subscription cancelled.", "success");
    else onToast(res.message || "Failed.", "error");
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const formatCurrency = (amt, cur = "INR") =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amt / 100);

  const daysLeft = sub?.currentPeriodEnd
    ? Math.max(0, Math.ceil((new Date(sub.currentPeriodEnd) - Date.now()) / 86400000))
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Subscription</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your plan and billing</p>
      </div>

      {/* Current Plan Card */}
      <Card className="overflow-hidden">
        <div className="px-6 py-5" style={{ background: "linear-gradient(135deg,#8200DB 0%,#b44dff 100%)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-200 text-xs font-semibold uppercase tracking-widest mb-1">Current Plan</p>
              <h3 className="text-white text-2xl font-extrabold">{plan?.displayName || "Free"}</h3>
              <p className="text-purple-200 text-sm mt-0.5">{plan?.description}</p>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold">{plan ? formatCurrency(plan.price, plan.currency) : "—"}</p>
              <p className="text-purple-200 text-xs">/{plan?.interval}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-purple-50">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</p>
            <Badge variant={sub?.status === "ACTIVE" ? "active" : "canceled"}>{sub?.status}</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Renews</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{formatDate(sub?.currentPeriodEnd)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Days Left</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{daysLeft} days</p>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-wrap gap-3 border-t border-gray-100">
          <PrimaryButton
          onClick={()=>{
            navigate("/pricing")
          }}
          className="flex-1 sm:flex-none">Upgrade Plan</PrimaryButton>
          {sub?.status === "ACTIVE" && !sub?.cancelAtPeriodEnd && (
            <GhostButton onClick={handleCancel} className="flex-1 sm:flex-none">
              {cancelLoading ? "Cancelling…" : "Cancel Plan"}
            </GhostButton>
          )}
          {sub?.cancelAtPeriodEnd && (
            <button
              onClick={async () => {
                const res = await apiFetch("/subscriptions/resume", { method: "PUT" });
                if (res.success) onToast("Subscription resumed!", "success");
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold border text-emerald-700 border-emerald-200
                hover:bg-emerald-50 transition-all"
            >
              Resume Subscription
            </button>
          )}
        </div>
      </Card>

      {/* Features */}
      {plan && (
        <Card className="p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Plan Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <FeatureRow label="Max Links" value={plan.maxLinks === -1 ? "Unlimited" : plan.maxLinks} />
            <FeatureRow label="Link in Bio" value={plan.linkInBio} />
            <FeatureRow label="Custom Themes" value={plan.customThemes} />
            <FeatureRow label="Analytics" value={plan.comprehensiveAnalytics} />
            <FeatureRow label="Remove Branding" value={plan.removeBranding} />
            <FeatureRow label="Priority Support" value={plan.prioritySupport} />
            <FeatureRow label="Video Background" value={plan.videoBackground} />
            <FeatureRow label="Digital Products" value={plan.digitalProducts} />
            <FeatureRow label="Linkhub Shops" value={plan.linkhubShops} />
            <FeatureRow label="Instagram Replies" value={plan.instagramReplies} />
          </div>
        </Card>
      )}

      {/* Payment History */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Payment History</h3>
        {history === null ? (
          <div className="flex justify-center py-6">
            <svg className="w-5 h-5 animate-spin text-purple-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : history?.payments?.length ? (
          <div className="space-y-2">
            {history.payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{formatCurrency(p.amount, p.currency)}</p>
                  <p className="text-xs text-gray-400">{formatDate(p.createdAt)}</p>
                </div>
                <Badge variant={p.status === "SUCCEEDED" ? "active" : "canceled"}>{p.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">No payment records yet.</p>
        )}
      </Card>
    </div>
  );
}

function DangerSection({ onToast }) {
  const [loading, setLoading] = useState(false);
  const [confirm_, setConfirm] = useState("");

  const handleDelete = async () => {
    if (confirm_ !== "DELETE") { onToast("Type DELETE to confirm.", "error"); return; }
    setLoading(true);
    const res = await apiFetch("/auth/delete", { method: "DELETE" });
    setLoading(false);
    if (res.success) { onToast("Account deleted.", "success"); window.location.href = "/"; }
    else onToast(res.message || "Failed.", "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
        <p className="text-sm text-gray-500 mt-1">Irreversible and destructive actions</p>
      </div>
      <Card className="p-6 border border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-lg">⚠️</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Delete Account</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Once deleted, your account and all data are permanently gone. This cannot be undone.
            </p>
            <Input
              label='Type "DELETE" to confirm'
              name="confirm"
              value={confirm_}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="DELETE"
            />
            <div className="mt-4">
              <PrimaryButton danger onClick={handleDelete} loading={loading}>
                Permanently Delete Account
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Main Account Page ─────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "profile", label: "Profile", icon: <FiUser /> },
  { id: "security", label: "Security", icon: <FiLock /> },
  { id: "subscription", label: "Subscription", icon: <FiZap /> },
  { id: "danger", label: "Danger Zone", icon: <FiAlertTriangle /> },
];

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [toast, setToast] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    apiFetch("/auth/me").then((res) => {
      if (res.success) setUser(res.data);
      else setError(res.message || "Failed to load account.");
      setLoading(false);
    }).catch(() => { setError("Could not connect to server."); setLoading(false); });
  }, []);

  const showToast = (message, type) => setToast({ message, type });

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading your account…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="p-8 text-center max-w-sm w-full">
        <p className="text-4xl mb-3">😕</p>
        <h2 className="font-bold text-gray-900 text-lg mb-1">Something went wrong</h2>
        <p className="text-sm text-gray-500">{error}</p>
      </Card>
    </div>
  );

  const activeLabel = SECTIONS.find((s) => s.id === activeSection)?.label;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2d6f5; border-radius: 8px; }
      `}</style>

      {/* Top Nav Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-sm"
              style={{ background: "#8200DB" }}>L</div>
            <span className="font-extrabold text-gray-900 text-base">Linkhub</span>
            <span className="hidden sm:block text-gray-300 mx-1">·</span>
            <span className="hidden sm:block text-sm text-gray-400 font-medium">Account Settings</span>
          </div>

          {/* Mobile nav toggle */}
          <button
            className="sm:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600
              hover:bg-[#F3E8FF] hover:text-purple-700 hover:border-purple-200 transition-all"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {SECTIONS.find((s) => s.id === activeSection)?.icon} {activeLabel}
            <svg className={`w-4 h-4 transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <Avatar src={user.profile?.profileImage || user.image} name={user.name} size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 pb-3 pt-2 space-y-1">
            {SECTIONS.map((s) => (
              <NavItem
                key={s.id} label={s.label} icon={s.icon}
                active={activeSection === s.id}
                onClick={() => { setActiveSection(s.id); setMobileNavOpen(false); }}
              />
            ))}
          </div>
        )}
      </header>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar — desktop */}
          <aside className="hidden sm:flex flex-col w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {SECTIONS.map((s) => (
                <NavItem
                  key={s.id} label={s.label} icon={s.icon}
                  active={activeSection === s.id}
                  onClick={() => setActiveSection(s.id)}
                />
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {activeSection === "profile" && <ProfileSection user={user} onToast={showToast} />}
            {activeSection === "security" && <SecuritySection onToast={showToast} />}
            {activeSection === "subscription" && <SubscriptionSection user={user} onToast={showToast} />}
            {activeSection === "danger" && <DangerSection onToast={showToast} />}
          </main>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}