import { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, ChevronRight, Briefcase, Building2, MapPin, DollarSign, FileText } from "lucide-react";
import { Layout } from "./Layout";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

type Status = "Applied" | "Under Review" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: number; title: string; company: string; location: string;
  appliedDate: string; status: Status; salary: string; logoBg: string; notes: string;
};

const STATUS_CONFIG: Record<Status, { color: string; bg: string; dot: string; border: string; icon: React.ReactNode }> = {
  "Applied":      { color: "text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500",   border: "border-blue-200",   icon: <Clock size={14} className="text-blue-500" /> },
  "Under Review": { color: "text-amber-600",  bg: "bg-amber-50",  dot: "bg-amber-400",  border: "border-amber-200",  icon: <Clock size={14} className="text-amber-500" /> },
  "Interview":    { color: "text-purple-600", bg: "bg-purple-50", dot: "bg-purple-500", border: "border-purple-200", icon: <CheckCircle2 size={14} className="text-purple-500" /> },
  "Offer":        { color: "text-green-600",  bg: "bg-green-50",  dot: "bg-green-500",  border: "border-green-200",  icon: <CheckCircle2 size={14} className="text-green-600" /> },
  "Rejected":     { color: "text-red-500",    bg: "bg-red-50",    dot: "bg-red-400",    border: "border-red-200",    icon: <XCircle size={14} className="text-red-400" /> },
};

const initialApps: Application[] = [
  { id: 1, title: "Senior Product Designer", company: "TechFlow Systems", location: "San Francisco, CA", appliedDate: "Apr 8, 2026", status: "Interview", salary: "$140k–$180k", logoBg: "#1a2a4a", notes: "Phone screen went well. Technical round scheduled for Apr 15." },
  { id: 2, title: "Frontend Engineer (React)", company: "Lumina Creative", location: "Remote", appliedDate: "Apr 9, 2026", status: "Applied", salary: "$120k–$155k", logoBg: "#0e6b38", notes: "" },
  { id: 3, title: "UX Research Lead", company: "Blue Knight Corp", location: "Austin, TX", appliedDate: "Apr 3, 2026", status: "Under Review", salary: "$150k–$200k", logoBg: "#1a4fa0", notes: "Recruiter reached out to confirm application receipt." },
  { id: 4, title: "Product Manager", company: "Lumina Creative", location: "New York, NY", appliedDate: "Mar 27, 2026", status: "Offer", salary: "$130k–$165k", logoBg: "#0e6b38", notes: "Offer received! Deadline to respond: Apr 20." },
  { id: 5, title: "Data Analyst", company: "TechFlow Systems", location: "Chicago, IL", appliedDate: "Mar 20, 2026", status: "Rejected", salary: "$90k–$120k", logoBg: "#1a2a4a", notes: "Position filled internally." },
];

const STATUSES: Status[] = ["Applied", "Under Review", "Interview", "Offer", "Rejected"];

/* ─── Application Detail Modal ─────────────────────────────── */
function AppDetailModal({ app, open, onClose, onWithdraw, onSaveNotes }: {
  app: Application | null;
  open: boolean;
  onClose: () => void;
  onWithdraw: (id: number) => void;
  onSaveNotes: (id: number, notes: string) => void;
}) {
  const [editNotes, setEditNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);

  useEffect(() => {
    setEditNotes(app?.notes ?? "");
    setEditingNotes(false);
  }, [app?.id]);

  if (!app) return null;
  const cfg = STATUS_CONFIG[app.status];

  const handleSaveNotes = () => {
    onSaveNotes(app.id, editNotes);
    setEditingNotes(false);
    showToast("Notes saved!", "success");
  };

  return (
    <Modal open={open} onClose={onClose} title="Application Details" size="lg">
      <div className="p-5 space-y-4">
        {/* Company */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: app.logoBg }}>
            <Briefcase size={20} className="text-white/70" />
          </div>
          <div>
            <p className="text-[#0d2657] font-bold text-sm">{app.title}</p>
            <p className="text-gray-400 text-xs">{app.company} · {app.location}</p>
          </div>
        </div>

        {/* Status badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl w-fit ${cfg.bg} border ${cfg.border}`}>
          {cfg.icon}
          <span className={`text-sm font-semibold ${cfg.color}`}>{app.status}</span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          {[{ label: "Applied", value: app.appliedDate }, { label: "Salary Range", value: app.salary }].map(d => (
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
            <button onClick={() => editingNotes ? handleSaveNotes() : setEditingNotes(true)} className="text-xs text-[#1a5cdb] hover:underline">
              {editingNotes ? "Save" : "Edit"}
            </button>
          </div>
          {editingNotes ? (
            <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3}
              placeholder="Add your notes here…"
              className="w-full border border-[#1a5cdb] rounded-xl p-3 text-sm text-gray-700 outline-none resize-none" autoFocus />
          ) : (
            <div className="bg-gray-50 rounded-xl p-3 min-h-[60px]">
              {app.notes
                ? <p className="text-sm text-gray-600">{app.notes}</p>
                : <p className="text-sm text-gray-300 italic">No notes yet. Click edit to add.</p>}
            </div>
          )}
        </div>

        {/* Actions */}
        {app.status !== "Offer" && app.status !== "Rejected" && (
          <button onClick={() => onWithdraw(app.id)}
            className="w-full border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
            Withdraw Application
          </button>
        )}
        {app.status === "Offer" && (
          <div className="flex gap-2">
            <button onClick={() => { showToast("Offer accepted! Congratulations 🎉", "success"); onWithdraw(app.id); onClose(); }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">
              Accept Offer
            </button>
            <button onClick={() => { showToast("Offer declined.", "info"); onWithdraw(app.id); onClose(); }}
              className="flex-1 border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all">
              Decline
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ─── AppliedPage ────────────────────────────────────────────── */
export function AppliedPage() {
  const [apps, setApps] = useState(initialApps);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filtered = filter === "All" ? apps : apps.filter(a => a.status === filter);
  const counts: Record<string, number> = { All: apps.length };
  STATUSES.forEach(s => { counts[s] = apps.filter(a => a.status === s).length; });

  const withdraw = (id: number) => {
    setApps(prev => prev.filter(a => a.id !== id));
    setSelectedApp(null);
    showToast("Application withdrawn.", "info");
  };

  const saveNotes = (id: number, notes: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, notes } : a));
    setSelectedApp(prev => prev?.id === id ? { ...prev, notes } : prev);
  };

  return (
    <>
      <AppDetailModal
        app={selectedApp}
        open={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onWithdraw={withdraw}
        onSaveNotes={saveNotes}
      />

      <Layout>
        <main className="flex-1 overflow-y-auto p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[#0d2657] font-bold text-3xl">Applications</h1>
              <p className="text-gray-400 text-sm mt-1">Track and manage your job applications</p>
            </div>
            <div className="text-right">
              <p className="text-[#0d2657] font-bold text-2xl">{apps.length}</p>
              <p className="text-gray-400 text-xs font-semibold tracking-wider">TOTAL APPLIED</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {STATUSES.map((s) => {
              const cfg = STATUS_CONFIG[s];
              const isActive = filter === s;
              return (
                <button key={s} onClick={() => setFilter(isActive ? "All" : s)}
                  className={`bg-white rounded-2xl border shadow-sm p-4 text-center hover:shadow-md transition-all ${isActive ? `${cfg.border} ring-2 ring-offset-1` : "border-gray-100"}`}>
                  <p className={`text-3xl font-bold ${cfg.color}`}>{counts[s] || 0}</p>
                  <p className="text-gray-400 text-xs font-semibold mt-1 truncate">{s}</p>
                </button>
              );
            })}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {(["All", ...STATUSES] as const).map((s) => {
              const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
              const isActive = filter === s;
              return (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive ? "bg-[#0d2657] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}>
                  {cfg && <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
                  {s}
                  <span className={`text-xs ${isActive ? "text-blue-200" : "text-gray-400"}`}>{counts[s]}</span>
                </button>
              );
            })}
          </div>

          {/* Applications Table */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20">
              <FileText size={40} strokeWidth={1} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400 text-sm">No applications with status "{filter}".</p>
              <button onClick={() => setFilter("All")} className="mt-2 text-[#1a5cdb] text-sm hover:underline">Show all</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
                <span className="col-span-4 text-xs text-gray-400 font-semibold uppercase tracking-wider">Position</span>
                <span className="col-span-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Company</span>
                <span className="col-span-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Salary</span>
                <span className="col-span-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Applied</span>
                <span className="col-span-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Status</span>
              </div>

              {/* Rows */}
              {filtered.map((app) => {
                const cfg = STATUS_CONFIG[app.status];
                return (
                  <button key={app.id} onClick={() => setSelectedApp(app)}
                    className="w-full grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors text-left group items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: app.logoBg }}>
                        <Building2 size={16} className="text-white/70" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#0d2657] font-semibold text-sm truncate">{app.title}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5 truncate">
                          <MapPin size={10} />{app.location}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 min-w-0">
                      <p className="text-gray-700 text-sm truncate">{app.company}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <DollarSign size={12} className="text-gray-400" />{app.salary.replace("$", "")}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 text-sm">{app.appliedDate}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {app.status}
                      </span>
                      <ChevronRight size={15} className="text-gray-300 group-hover:text-[#1a5cdb] transition-colors shrink-0" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>
      </Layout>
    </>
  );
}
