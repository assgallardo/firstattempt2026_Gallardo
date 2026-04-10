import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, Send, X } from "lucide-react";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1555238920-7a6bea18473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMG9mZmljZSUyMGJ1aWxkaW5nJTIwYmx1ZXxlbnwxfHx8fDE3NzU3ODk3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080";

const TABS = ["Alumni", "Employer", "Staff"] as const;
type Tab = (typeof TABS)[number];

/* ─── Forgot Password Modal ─────────────────────────────── */
function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"email" | "sent">("email");
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!resetEmail.trim()) { setError("Please enter your email."); return; }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) { setError("Enter a valid email address."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("sent"); }, 1200);
  };

  const handleClose = () => { setStep("email"); setResetEmail(""); setError(""); onClose(); };

  return (
    <Modal open={open} onClose={handleClose} title="Reset Password">
      {step === "email" ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-500">
            Enter the email address linked to your account and we'll send you a reset link.
          </p>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
            <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 focus-within:border-[#1a5cdb] transition-colors ${error ? "border-red-400" : "border-gray-300"}`}>
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="your@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <><Send size={15} /> Send Reset Link</>
            )}
          </button>
        </div>
      ) : (
        <div className="p-5 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <p className="text-[#0d2657] font-bold text-base">Check Your Email</p>
            <p className="text-gray-500 text-sm mt-1">
              We sent a password reset link to <strong className="text-[#0d2657]">{resetEmail}</strong>.
            </p>
          </div>
          <p className="text-xs text-gray-400">Didn't receive it? Check your spam folder or{" "}
            <button className="text-[#1a5cdb] hover:underline" onClick={() => setStep("email")}>try again</button>.
          </p>
          <button onClick={handleClose} className="w-full bg-[#0d2657] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3a6b] transition-all">
            Back to Sign In
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ─── SSO Modal ──────────────────────────────────────────── */
function SSOModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [orgId, setOrgId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!orgId.trim()) { setError("Organization ID is required."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onClose(); onSuccess(); }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Single Sign-On">
      <div className="p-5 space-y-4">
        <p className="text-sm text-gray-500">
          Enter your organization's ID or domain to continue with SSO.
        </p>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Organization ID or Domain</label>
          <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 focus-within:border-[#1a5cdb] transition-colors ${error ? "border-red-400" : "border-gray-300"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <input
              type="text"
              placeholder="e.g. university.edu or ORG-12345"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> You will be redirected to your organization's login page.
          </p>
        </div>
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : "Continue with SSO"}
        </button>
      </div>
    </Modal>
  );
}

/* ─── Request Access Modal ───────────────────────────────── */
function RequestAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Alumni", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.reason.trim()) e.reason = "Please describe your reason for access.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const handleClose = () => { setSubmitted(false); setForm({ name: "", email: "", role: "Alumni", reason: "" }); setErrors({}); onClose(); };

  const field = (key: keyof typeof form, label: string, type = "text", placeholder = "") => (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 focus-within:border-[#1a5cdb] transition-colors ${errors[key] ? "border-red-400" : "border-gray-300"}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <Modal open={open} onClose={handleClose} title="Request Access">
      {!submitted ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-500">Fill in your details and we'll review your request within 1-2 business days.</p>
          {field("name", "Full Name", "text", "John Doe")}
          {field("email", "Email Address", "email", "john@university.edu")}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1a5cdb] bg-white"
            >
              {["Alumni", "Employer", "Staff", "Student"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Reason for Access</label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Briefly describe why you need access..."
              rows={3}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none resize-none focus:border-[#1a5cdb] transition-colors ${errors.reason ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : "Submit Request"}
          </button>
        </div>
      ) : (
        <div className="p-5 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <p className="text-[#0d2657] font-bold text-base">Request Submitted!</p>
            <p className="text-gray-500 text-sm mt-1">We'll review your request and get back to <strong className="text-[#0d2657]">{form.email}</strong> within 1–2 business days.</p>
          </div>
          <button onClick={handleClose} className="w-full bg-[#0d2657] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3a6b] transition-all">
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ─── Info Modal ─────────────────────────────────────────── */
const INFO_CONTENT: Record<string, { title: string; body: string }> = {
  PRIVACY: {
    title: "Privacy Policy",
    body: `Career Passport is committed to protecting your privacy. We collect only the information necessary to provide our services, including your name, email address, academic records, and career history.\n\nYour data is encrypted at rest and in transit. We do not sell your personal information to third parties. You may request deletion of your account and all associated data at any time by contacting our support team.\n\nWe use industry-standard security measures to protect your information. For questions about our privacy practices, please contact privacy@careerpassport.edu.`,
  },
  TERMS: {
    title: "Terms of Service",
    body: `By using Career Passport, you agree to these terms. This platform is provided for professional networking and career development purposes only.\n\nYou are responsible for maintaining the confidentiality of your login credentials. You agree not to use this platform for any unlawful purpose or in any way that could harm other users.\n\nCareer Passport reserves the right to suspend or terminate accounts that violate these terms. All content you post must be accurate and professional. We reserve the right to update these terms at any time with notice to users.`,
  },
  SUPPORT: {
    title: "Support",
    body: `Need help? Our support team is available Monday–Friday, 9 AM–6 PM EST.\n\n📧 Email: support@careerpassport.edu\n📞 Phone: +1 (800) 555-0199\n💬 Live Chat: Available in-app during business hours\n\nFor urgent account issues outside business hours, please email urgent@careerpassport.edu and we will respond within 4 hours.\n\nFor technical issues, please include your browser version and a screenshot of the error when contacting support.`,
  },
};

function InfoModal({ topic, onClose }: { topic: string | null; onClose: () => void }) {
  if (!topic) return null;
  const info = INFO_CONTENT[topic];
  return (
    <Modal open={!!topic} onClose={onClose} title={info.title}>
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{info.body}</p>
        <button onClick={onClose} className="mt-5 w-full bg-[#0d2657] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3a6b] transition-all">
          Close
        </button>
      </div>
    </Modal>
  );
}

/* ─── LoginPage ──────────────────────────────────────────── */
export function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Alumni");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Modals
  const [showForgot, setShowForgot] = useState(false);
  const [showSSO, setShowSSO] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [infoTopic, setInfoTopic] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim()) { setEmailError("Email or ID is required."); return false; }
    setEmailError(""); return true;
  };

  const handleSignIn = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/profile"); }, 900);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    showToast("Connecting to Google…", "info");
    setTimeout(() => {
      setGoogleLoading(false);
      showToast("Signed in with Google!", "success");
      setTimeout(() => navigate("/profile"), 700);
    }, 1800);
  };

  const handleSSOSuccess = () => {
    showToast("SSO authentication successful!", "success");
    setTimeout(() => navigate("/profile"), 800);
  };

  return (
    <>
      <ForgotPasswordModal open={showForgot} onClose={() => setShowForgot(false)} />
      <SSOModal open={showSSO} onClose={() => setShowSSO(false)} onSuccess={handleSSOSuccess} />
      <RequestAccessModal open={showRegister} onClose={() => setShowRegister(false)} />
      <InfoModal topic={infoTopic} onClose={() => setInfoTopic(null)} />

      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-center">
          <span className="text-[#1a3a6b] font-bold text-lg tracking-wide">Career Passport</span>
        </div>

        {/* Hero Image */}
        <div className="relative h-44 overflow-hidden">
          <img src={HERO_IMAGE} alt="Office building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2657]/80 via-[#0d2657]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 px-5 pb-5">
            <h1 className="text-white text-2xl font-bold leading-tight">Welcome Back</h1>
            <p className="text-gray-200 text-sm mt-1">Access your professional network and career tools.</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mx-4 mt-4 border border-[#1a5cdb] rounded-lg grid grid-cols-3 overflow-hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-[#0d2657] text-white"
                  : "text-gray-500 hover:text-[#1a5cdb] bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="px-5 pt-5 pb-4 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email or ID</label>
            <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 bg-white transition-colors ${emailError ? "border-red-400" : "border-gray-300 focus-within:border-[#1a5cdb]"}`}>
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="Enter your email or ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 gap-2 bg-white focus-within:border-[#1a5cdb] transition-colors">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button onClick={() => setShowForgot(true)} className="text-[#1a5cdb] text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading || googleLoading}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] active:scale-[0.98] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (<>Sign In <LogIn size={16} /></>)}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full border border-gray-300 rounded-xl py-2.5 flex items-center justify-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {googleLoading ? (
              <svg className="animate-spin h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            )}
            {googleLoading ? "Connecting…" : "Sign in with Google"}
          </button>

          {/* SSO */}
          <button
            onClick={() => setShowSSO(true)}
            disabled={loading || googleLoading}
            className="w-full border border-gray-300 rounded-xl py-2.5 flex items-center justify-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a5cdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Single Sign-On (SSO)
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 text-center">
          <p className="text-sm text-gray-500">
            New to Career Passport?{" "}
            <button onClick={() => setShowRegister(true)} className="text-[#0d2657] font-bold hover:underline">
              Request Access
            </button>
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            {["PRIVACY", "TERMS", "SUPPORT"].map((item) => (
              <button
                key={item}
                onClick={() => setInfoTopic(item)}
                className="text-xs text-gray-400 hover:text-[#1a5cdb] uppercase tracking-wide transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
