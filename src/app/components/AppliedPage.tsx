import { useState } from "react";
import { ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight, Briefcase, Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { BottomNav } from "./BottomNav";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

type Status = "Applied" | "Under Review" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: number;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  status: Status;
  salary: string;
  logoBg: string;
  notes: string;
};

const STATUS_CONFIG: Record<Status, { color: string; bg: string; dot: string; icon: React.ReactNode }> = {
  "Applied":      { color: "text-blue-600",  bg: "bg-blue-50",   dot: "bg-blue-500",   icon: <Clock size={14} className="text-blue-500" /> },
  "Under Review": { color: "text-amber-600", bg: "bg-amber-50",  dot: "bg-amber-400",  icon: <Clock size={14} className="text-amber-500" /> },
  "Interview":    { color: "text-purple-600",bg: "bg-purple-50", dot: "bg-purple-500", icon: <CheckCircle2 size={14} className="text-purple-500" /> },
  "Offer":        { color: "text-green-600", bg: "bg-green-50",  dot: "bg-green-500",  icon: <CheckCircle2 size={14} className="text-green-600" /> },
  "Rejected":     { color: "text-red-500",   bg: "bg-red-50",    dot: "bg-red-400",    icon: <XCircle size={14} className="text-red-400" /> },
};

const initialApps: Application[] = [
  { id: 1, title: "Senior Product Designer", company: "TechFlow Systems", location: "San Francisco, CA", appliedDate: "Apr 8, 2026", status: "Interview", salary: "$140k–$180k", logoBg: "#1a2a4a", notes: "Phone screen went well. Technical round scheduled for Apr 15." },
  { id: 2, title: "Frontend Engineer (React)", company: "Lumina Creative", location: "Remote", appliedDate: "Apr 9, 2026", status: "Applied", salary: "$120k–$155k", logoBg: "#0e6b38", notes: "" },
  { id: 3, title: "UX Research Lead", company: "Blue Knight Corp", location: "Austin, TX", appliedDate: "Apr 3, 2026", status: "Under Review", salary: "$150k–$200k", logoBg: "#1a4fa0", notes: "Recruiter reached out to confirm application receipt." },
  { id: 4, title: "Product Manager", company: "Lumina Creative", location: "New York, NY", appliedDate: "Mar 27, 2026", status: "Offer", salary: "$130k–$165k", logoBg: "#0e6b38", notes: "Offer received! Deadline to respond: Apr 20." },
  { id: 5, title: "Data Analyst", company: "TechFlow Systems", location: "Chicago, IL", appliedDate: "Mar 20, 2026", status: "Rejected", salary: "$90k–$120k", logoBg: "#1a2a4a", notes: "Position filled internally." },
];

const STATUSES: Status[] = ["Applied", "Under Review", "Interview", "Offer", "Rejected"];

export function AppliedPage() {
  const navigate = useNavigate();
  const [apps, setApps] = useState(initialApps);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);

  const filtered = filter === "All" ? apps : apps.filter(a => a.status === filter);

  const counts: Record<string, number> = { All: apps.length };
  STATUSES.forEach(s => { counts[s] = apps.filter(a => a.status === s).length; });

  const openApp = (app: Application) => { setSelectedApp(app); setEditNotes(app.notes); setEditingNotes(false); };

  const saveNotes = () => {
    if (!selectedApp) return;
    setApps(prev => prev.map(a => a.id === selectedApp.id ? { ...a, notes: editNotes } : a));
    setSelectedApp({ ...selectedApp, notes: editNotes });
    setEditingNotes(false);
    showToast("Notes saved!", "success");
  };

  const withdraw = (id: number) => {
    setApps(prev => prev.filter(a => a.id !== id));
    setSelectedApp(null);
    showToast("Application withdrawn.", "info");
  };

  return (
    <>
      {/* App Detail Modal */}
      <Modal open={!!selectedApp} onClose={() => setSelectedApp(null)} title="Application Details" size="lg">
        {selectedApp && (
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl shrink-0" style={{ backgroundColor: selectedApp.logoBg }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Briefcase size={20} className="text-white/70" />
                </div>
              </div>
              <div>
                <p className="text-[#0d2657] font-bold text-sm">{selectedApp.title}</p>
                <p className="text-gray-400 text-xs">{selectedApp.company} · {selectedApp.location}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl w-fit ${STATUS_CONFIG[selectedApp.status].bg}`}>
              {STATUS_CONFIG[selectedApp.status].icon}
              <span className={`text-sm font-semibold ${STATUS_CONFIG[selectedApp.status].color}`}>{selectedApp.status}</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Applied", value: selectedApp.appliedDate },
                { label: "Salary Range", value: selectedApp.salary },
              ].map(d => (
                <div key={d.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">{d.label}</p>
                  <p className="text-sm text-[#0d2657] font-semibold mt-0.5">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm text-[#0d2657] font-semibold">My Notes</p>
                <button
                  onClick={() => editingNotes ? saveNotes() : setEditingNotes(true)}
                  className="text-xs text-[#1a5cdb] hover:underline"
                >
                  {editingNotes ? "Save" : "Edit"}
                </button>
              </div>
              {editingNotes ? (
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Add your notes here…"
                  className="w-full border border-[#1a5cdb] rounded-xl p-3 text-sm text-gray-700 outline-none resize-none"
                  autoFocus
                />
              ) : (
                <div className="bg-gray-50 rounded-xl p-3 min-h-[60px]">
                  <p className="text-sm text-gray-600">{selectedApp.notes || <span className="text-gray-300 italic">No notes yet. Tap edit to add.</span>}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {selectedApp.status !== "Offer" && selectedApp.status !== "Rejected" && (
              <button
                onClick={() => withdraw(selectedApp.id)}
                className="w-full border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Withdraw Application
              </button>
            )}
            {selectedApp.status === "Offer" && (
              <div className="flex gap-2">
                <button onClick={() => { showToast("Offer accepted! Congratulations 🎉", "success"); setSelectedApp(null); setApps(prev => prev.filter(a => a.id !== selectedApp.id)); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">
                  Accept Offer
                </button>
                <button onClick={() => { showToast("Offer declined.", "info"); withdraw(selectedApp.id); }} className="flex-1 border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all">
                  Decline
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <button onClick={() => navigate("/jobs")} className="text-gray-500 hover:text-[#1a5cdb] transition-colors p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[#0d2657] font-bold text-lg">Applications</span>
          <span className="text-sm text-gray-400 font-semibold">{apps.length} total</span>
        </div>

        {/* Status Filter Tabs */}
        <div className="px-4 pt-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
          {(["All", ...STATUSES] as const).map((s) => {
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${isActive ? "bg-[#0d2657] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {s !== "All" && cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                {s} {counts[s] > 0 && <span className={`text-[10px] ${isActive ? "text-blue-200" : "text-gray-400"}`}>{counts[s]}</span>}
              </button>
            );
          })}
        </div>

        {/* Summary Row */}
        <div className="px-4 pb-2 grid grid-cols-3 gap-2">
          {[
            { label: "Active", value: apps.filter(a => ["Applied", "Under Review", "Interview"].includes(a.status)).length, color: "text-blue-600" },
            { label: "Offers", value: apps.filter(a => a.status === "Offer").length, color: "text-green-600" },
            { label: "Rejected", value: apps.filter(a => a.status === "Rejected").length, color: "text-red-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl py-2 text-center">
              <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-[10px] font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Application List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No applications with status "{filter}".
            </div>
          )}
          {filtered.map((app) => {
            const cfg = STATUS_CONFIG[app.status];
            return (
              <button
                key={app.id}
                onClick={() => openApp(app)}
                className="w-full flex items-center gap-3 p-3.5 border border-gray-100 rounded-2xl hover:border-[#1a5cdb] hover:shadow-sm transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: app.logoBg }}>
                  <Building2 size={18} className="text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0d2657] font-bold text-sm truncate">{app.title}</p>
                  <p className="text-gray-400 text-xs truncate">{app.company} · {app.location}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className={`text-xs font-semibold ${cfg.color}`}>{app.status}</span>
                    <span className="text-gray-300 text-xs">· {app.appliedDate}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1a5cdb] transition-colors shrink-0" />
              </button>
            );
          })}
        </div>

        <BottomNav variant="jobs" />
      </div>
    </>
  );
}
