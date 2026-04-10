import { useNavigate, useLocation } from "react-router";
import { Users, BriefcaseBusiness, MessageSquare, IdCard, Search, CheckSquare } from "lucide-react";

type NavItem = { label: string; path: string; icon: React.ReactNode };

const profileNav: NavItem[] = [
  { label: "PASSPORT", path: "/profile", icon: <IdCard size={22} /> },
  { label: "NETWORK",  path: "/network",  icon: <Users size={22} /> },
  { label: "JOBS",     path: "/jobs",     icon: <BriefcaseBusiness size={22} /> },
  { label: "MESSAGES", path: "/messages", icon: <MessageSquare size={22} /> },
];

const jobsNav: NavItem[] = [
  { label: "SEARCH",   path: "/jobs",     icon: <Search size={22} /> },
  { label: "APPLIED",  path: "/applied",  icon: <CheckSquare size={22} /> },
  { label: "MESSAGES", path: "/messages", icon: <MessageSquare size={22} /> },
  {
    label: "PROFILE",  path: "/profile",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export function BottomNav({ variant }: { variant: "profile" | "jobs" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = variant === "profile" ? profileNav : jobsNav;

  return (
    <div className="border-t border-gray-100 grid grid-cols-4 bg-white shrink-0">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-3 gap-0.5 transition-colors relative ${
              isActive ? "text-[#0d2657]" : "text-gray-400 hover:text-[#1a5cdb]"
            }`}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#0d2657]" />
            )}
            {item.icon}
            <span className={`text-[9px] font-semibold tracking-wider mt-0.5 ${isActive ? "text-[#0d2657]" : "text-gray-400"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
