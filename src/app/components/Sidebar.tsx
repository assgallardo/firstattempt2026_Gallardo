import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  IdCard, BriefcaseBusiness, Users, MessageSquare,
  CheckSquare, Settings, LogOut, Bell, Shield, Moon, Eye, Award,
} from "lucide-react";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

const AVATAR =
  "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc1Nzg5ODQyfDA&ixlib=rb-4.1.0&q=80&w=400";

const NAV_ITEMS = [
  { label: "My Passport",  path: "/profile",  icon: IdCard },
  { label: "Job Search",   path: "/jobs",     icon: BriefcaseBusiness },
  { label: "Applications", path: "/applied",  icon: CheckSquare },
  { label: "Network",      path: "/network",  icon: Users },
  { label: "Messages",     path: "/messages", icon: MessageSquare },
];

/* ─── Settings Modal ─────────────────────────────────────────── */
function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [notifs, setNotifs] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${value ? "bg-[#0d2657]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? "left-[22px]" : "left-[2px]"}`} />
    </button>
  );

  const Section = ({ icon, title, desc, value, onChange }: {
    icon: React.ReactNode; title: string; desc: string; value: boolean; onChange: () => void;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">{icon}</div>
        <div>
          <p className="text-[#0d2657] font-semibold text-sm">{title}</p>
          <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
        </div>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className="p-5 space-y-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Notifications</p>
        <Section icon={<Bell size={16} className="text-[#1a5cdb]" />} title="Push Notifications" desc="App alerts for messages and updates" value={notifs} onChange={() => setNotifs(v => !v)} />
        <Section icon={<Award size={16} className="text-[#1a5cdb]" />} title="Job Alerts" desc="Get notified about matching jobs" value={jobAlerts} onChange={() => setJobAlerts(v => !v)} />

        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold pt-4 mb-2">Privacy & Security</p>
        <Section icon={<Eye size={16} className="text-[#1a5cdb]" />} title="Public Profile" desc="Allow others to view your profile" value={profileVisible} onChange={() => setProfileVisible(v => !v)} />
        <Section icon={<Shield size={16} className="text-[#1a5cdb]" />} title="Two-Factor Auth" desc="Extra security for your account" value={twoFA} onChange={() => setTwoFA(v => !v)} />

        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold pt-4 mb-2">Appearance</p>
        <Section icon={<Moon size={16} className="text-[#1a5cdb]" />} title="Dark Mode" desc="Switch to dark theme" value={darkMode} onChange={() => setDarkMode(v => !v)} />

        <div className="pt-4">
          <button
            onClick={() => { showToast("Settings saved!", "success"); onClose(); }}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Sidebar ─────────────────────────────────────────────────── */
export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  const handleSignOut = () => {
    showToast("Signed out successfully.", "info");
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <>
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />

      <aside className="w-60 h-screen flex flex-col bg-[#0d2657] shrink-0 sticky top-0 z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <IdCard size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-base tracking-wide leading-none">Career Passport</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : ""} />
                <span>{label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pt-3 pb-4 border-t border-white/10 space-y-0.5">
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/55 hover:bg-white/10 hover:text-white transition-all"
          >
            <Settings size={18} />
            Settings
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/55 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
          {/* User pill */}
          <div className="flex items-center gap-3 px-3 py-3 mt-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/15 transition-colors" onClick={() => navigate("/profile")}>
            <img src={AVATAR} alt="Alex Johnson" className="w-8 h-8 rounded-full object-cover object-top shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate leading-tight">Alex Johnson</p>
              <p className="text-white/45 text-xs truncate">Class of 2020</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
