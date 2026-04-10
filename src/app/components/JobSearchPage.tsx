import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Bell, SlidersHorizontal, Bookmark, ChevronDown,
  DollarSign, BriefcaseBusiness, Clock, MapPin, X, CheckCircle2,
  Building2, ExternalLink, Users, ChevronRight,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

const COMPANY_LOGOS = [
  "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ28lMjBtaW5pbWFsJTIwZGFya3xlbnwxfHx8fDE3NzU3ODk4ODR8MA&ixlib=rb-4.1.0&q=80&w=100",
  "https://images.unsplash.com/photo-1689267166689-795f4f536819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMGRlc2lnbiUyMHN0dWRpbyUyMGxvZ28lMjBncmVlbnxlbnwxfHx8fDE3NzU3ODk4ODR8MA&ixlib=rb-4.1.0&q=80&w=100",
  "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ28lMjBtaW5pbWFsJTIwZGFya3xlbnwxfHx8fDE3NzU3ODk4ODR8MA&ixlib=rb-4.1.0&q=80&w=100",
];

type Job = {
  id: number; title: string; company: string; location: string;
  salary: string; type: string; posted: string; match: number;
  logoIndex: number; logoBg: string; saved: boolean;
  degree: string; skills: string[]; description: string; team: string; openings: number;
};

const ALL_JOBS: Job[] = [
  { id: 1, title: "Senior Product Designer", company: "TechFlow Systems", location: "San Francisco, CA", salary: "$140k–$180k", type: "Full-time", posted: "2 days ago", match: 98, logoIndex: 0, logoBg: "#1a2a4a", saved: false, degree: "Bachelor's", skills: ["UX Research", "Figma", "Product Strategy"], description: "Lead product design initiatives across our core platform. Work closely with PMs and engineers to define and execute UX strategy.", team: "Product & Design", openings: 2 },
  { id: 2, title: "Frontend Engineer (React)", company: "Lumina Creative", location: "Remote", salary: "$120k–$155k", type: "Contract", posted: "5 hours ago", match: 92, logoIndex: 1, logoBg: "#0e6b38", saved: false, degree: "Bachelor's", skills: ["React", "TypeScript", "CSS"], description: "Build scalable, accessible UI components for our award-winning creative platform. Collaborate with designers on pixel-perfect implementations.", team: "Engineering", openings: 1 },
  { id: 3, title: "UX Research Lead", company: "Blue Knight Corp", location: "Austin, TX", salary: "$150k–$200k", type: "Full-time", posted: "1 week ago", match: 89, logoIndex: 2, logoBg: "#1a4fa0", saved: false, degree: "Master's", skills: ["UX Research", "Data Analysis", "User Testing"], description: "Own the research practice for our enterprise product suite. Design and conduct studies that inform product direction.", team: "Research", openings: 1 },
  { id: 4, title: "Data Analyst", company: "TechFlow Systems", location: "Chicago, IL", salary: "$90k–$120k", type: "Full-time", posted: "3 days ago", match: 85, logoIndex: 0, logoBg: "#1a2a4a", saved: false, degree: "Bachelor's", skills: ["SQL", "Python", "Tableau"], description: "Transform complex data into actionable insights. Support strategic decisions across finance, product, and marketing.", team: "Data & Analytics", openings: 3 },
  { id: 5, title: "Product Manager", company: "Lumina Creative", location: "New York, NY", salary: "$130k–$165k", type: "Full-time", posted: "Just now", match: 91, logoIndex: 1, logoBg: "#0e6b38", saved: false, degree: "Bachelor's", skills: ["Product Strategy", "Agile", "SQL"], description: "Define and execute the roadmap for our content creation tools. Bridge the gap between customer needs and engineering capabilities.", team: "Product", openings: 1 },
  { id: 6, title: "Project Manager", company: "Blue Knight Corp", location: "Remote", salary: "$100k–$135k", type: "Full-time", posted: "4 days ago", match: 87, logoIndex: 2, logoBg: "#1a4fa0", saved: false, degree: "Bachelor's", skills: ["Project Management", "Agile", "Stakeholder Management"], description: "Oversee complex cross-functional projects from initiation to delivery. Ensure timelines, quality, and team alignment across departments.", team: "Operations", openings: 2 },
];

const DEGREE_OPTIONS = ["Any Degree", "Bachelor's", "Master's", "PhD", "Associate's"];
const SKILL_OPTIONS = ["UX Research", "SQL", "Python", "React", "Project Management", "Data Analysis", "Product Strategy"];
const LOCATION_OPTIONS = ["Anywhere", "Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Chicago, IL"];

/* ─── Notifications Panel ─────────────────────────────────── */
const NOTIFICATIONS = [
  { id: 1, icon: "job", title: "New match: Senior PM at Google", time: "2 min ago", read: false },
  { id: 2, icon: "msg", title: "TechFlow Systems viewed your profile", time: "1 hr ago", read: false },
  { id: 3, icon: "apply", title: "Application submitted to Lumina Creative", time: "Yesterday", read: true },
  { id: 4, icon: "job", title: "3 new jobs match your skills", time: "2 days ago", read: true },
  { id: 5, icon: "msg", title: "You have a new message from HR", time: "3 days ago", read: true },
];

function NotifPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const markAll = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  return (
    <Modal open={open} onClose={onClose} title="Notifications">
      <div className="px-5 pt-3 pb-1 flex items-center justify-between">
        <span className="text-xs text-gray-400">{notifs.filter(n => !n.read).length} unread</span>
        <button onClick={markAll} className="text-xs text-[#1a5cdb] hover:underline">Mark all read</button>
      </div>
      <div className="pb-4">
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex items-start gap-3 px-5 py-3 cursor-pointer transition-colors ${n.read ? "" : "bg-blue-50/60"} hover:bg-gray-50`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.icon === "job" ? "bg-[#0d2657]/10" : n.icon === "msg" ? "bg-green-100" : "bg-amber-100"}`}>
              {n.icon === "job" ? <BriefcaseBusiness size={15} className="text-[#0d2657]" /> : n.icon === "msg" ? <Users size={15} className="text-green-600" /> : <CheckCircle2 size={15} className="text-amber-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? "text-gray-600" : "text-[#0d2657] font-semibold"}`}>{n.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-[#1a5cdb] mt-1.5 shrink-0" />}
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ─── Advanced Filter Panel ───────────────────────────────── */
function FilterPanel({
  open, onClose, onApply,
}: { open: boolean; onClose: () => void; onApply: (f: Filters) => void }) {
  const [minSalary, setMinSalary] = useState(80);
  const [jobType, setJobType] = useState<string[]>([]);
  const [isRemote, setIsRemote] = useState(false);

  const toggleType = (t: string) =>
    setJobType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleApply = () => { onApply({ minSalary, jobType, isRemote }); onClose(); showToast("Filters applied!", "info"); };
  const handleReset = () => { setMinSalary(80); setJobType([]); setIsRemote(false); };

  return (
    <Modal open={open} onClose={onClose} title="Advanced Filters">
      <div className="p-5 space-y-5">
        {/* Salary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-700 font-semibold">Minimum Salary</label>
            <span className="text-sm text-[#0d2657] font-bold">${minSalary}k+</span>
          </div>
          <input
            type="range" min={40} max={200} step={10} value={minSalary}
            onChange={(e) => setMinSalary(+e.target.value)}
            className="w-full accent-[#0d2657]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$40k</span><span>$200k</span></div>
        </div>
        {/* Job Type */}
        <div>
          <label className="text-sm text-gray-700 font-semibold mb-2 block">Job Type</label>
          <div className="flex flex-wrap gap-2">
            {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${jobType.includes(t) ? "bg-[#0d2657] text-white border-[#0d2657]" : "border-gray-300 text-gray-600 hover:border-[#1a5cdb]"}`}
              >{t}</button>
            ))}
          </div>
        </div>
        {/* Remote */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700 font-semibold">Remote Only</label>
          <button
            onClick={() => setIsRemote(v => !v)}
            className={`w-11 h-6 rounded-full transition-colors relative ${isRemote ? "bg-[#0d2657]" : "bg-gray-200"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${isRemote ? "left-[22px]" : "left-[2px]"}`} />
          </button>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={handleReset} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">Reset</button>
          <button onClick={handleApply} className="flex-1 bg-[#0d2657] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3a6b] transition-all">Apply Filters</button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Filter Dropdown ──────────────────────────────────────── */
function FilterDropdown({
  label, options, selected, onSelect, onClose, anchorRef,
}: { label: string; options: string[]; selected: string; onSelect: (v: string) => void; onClose: () => void; anchorRef: React.RefObject<HTMLButtonElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && !anchorRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  return (
    <div ref={ref} className="absolute top-full mt-1 left-0 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[160px]">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => { onSelect(opt); onClose(); }}
          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 ${selected === opt ? "text-[#0d2657] font-semibold bg-blue-50" : "text-gray-700"}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── Job Detail Modal ────────────────────────────────────── */
function JobDetailModal({
  job, open, onClose, applied, onApply, onSave,
}: { job: Job | null; open: boolean; onClose: () => void; applied: boolean; onApply: () => void; onSave: () => void }) {
  if (!job) return null;
  return (
    <Modal open={open} onClose={onClose} title={job.title} size="lg">
      <div className="p-5 space-y-4">
        {/* Company info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: job.logoBg }}>
            <img src={COMPANY_LOGOS[job.logoIndex]} alt={job.company} className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <p className="text-[#0d2657] font-bold text-sm">{job.company}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin size={11} /> {job.location}</p>
          </div>
          <div className="ml-auto">
            <MatchBadge match={job.match} />
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <DollarSign size={13} />, label: job.salary },
            { icon: <BriefcaseBusiness size={13} />, label: job.type },
            { icon: <GraduationCap size={13} />, label: job.degree },
            { icon: <Users size={13} />, label: `${job.openings} opening${job.openings > 1 ? "s" : ""}` },
          ].map((m) => (
            <span key={m.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700">
              {m.icon}{m.label}
            </span>
          ))}
        </div>

        {/* Description */}
        <div>
          <p className="text-[#0d2657] font-semibold text-sm mb-1">About the Role</p>
          <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[#0d2657] font-semibold text-sm mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-[#0d2657] rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 size={15} className="text-gray-400" />
          <span>Team: <strong className="text-[#0d2657]">{job.team}</strong></span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onApply}
            disabled={applied}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${applied ? "bg-green-600 text-white cursor-default" : "bg-[#0d2657] hover:bg-[#1a3a6b] text-white active:scale-[0.98]"}`}
          >
            {applied ? "Applied ✓" : "Apply Now"}
          </button>
          <button
            onClick={onSave}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${job.saved ? "border-[#1a5cdb] bg-blue-50 text-[#1a5cdb]" : "border-gray-200 text-gray-400 hover:border-[#1a5cdb]"}`}
          >
            <Bookmark size={18} fill={job.saved ? "currentColor" : "none"} />
          </button>
        </div>
        <button
          onClick={() => { showToast("Opening company website…", "info"); }}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink size={14} /> Visit Company Website
        </button>
      </div>
    </Modal>
  );
}

function MatchBadge({ match }: { match: number }) {
  const color = match >= 95 ? "text-green-600 bg-green-50 border-green-200" : match >= 90 ? "text-blue-600 bg-blue-50 border-blue-200" : "text-orange-500 bg-orange-50 border-orange-200";
  return (
    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 shrink-0 ${color}`}>
      <span className="font-bold text-sm leading-none">{match}%</span>
      <span className="text-[9px] font-semibold">Match</span>
    </div>
  );
}

type Filters = { minSalary: number; jobType: string[]; isRemote: boolean };

function GraduationCap({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

/* ─── JobSearchPage ────────────────────────────────────────── */
export function JobSearchPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(ALL_JOBS);
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({ minSalary: 0, jobType: [], isRemote: false });

  // Modals & panels
  const [showNotifs, setShowNotifs] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Per-pill dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [degreeFilter, setDegreeFilter] = useState("Any Degree");
  const [skillFilter, setSkillFilter] = useState("UX Research");
  const [locationFilter, setLocationFilter] = useState("Anywhere");
  const degreeRef = useRef<HTMLButtonElement>(null);
  const skillRef = useRef<HTMLButtonElement>(null);
  const locationRef = useRef<HTMLButtonElement>(null);

  const unreadCount = 2;

  const toggleSave = (id: number) =>
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, saved: !j.saved } : j));

  const handleApply = (id: number) => {
    if (!applied.has(id)) {
      setApplied((prev) => { const n = new Set(prev); n.add(id); return n; });
      showToast("Application submitted!", "success");
    }
  };

  const closeDropdowns = () => setOpenDropdown(null);

  // Filtered list
  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    const matchSalary = activeFilters.minSalary === 0 || parseInt(j.salary.replace(/[^0-9]/g, "")) >= activeFilters.minSalary;
    const matchType = activeFilters.jobType.length === 0 || activeFilters.jobType.includes(j.type);
    const matchRemote = !activeFilters.isRemote || j.location === "Remote";
    const matchDegree = degreeFilter === "Any Degree" || j.degree === degreeFilter;
    const matchSkill = skillFilter === "Any Skill" || j.skills.includes(skillFilter);
    const matchLoc = locationFilter === "Anywhere" || j.location === locationFilter;
    return matchSearch && matchSalary && matchType && matchRemote && matchDegree && matchSkill && matchLoc;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 3);

  return (
    <>
      <NotifPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
      <FilterPanel open={showFilterPanel} onClose={() => setShowFilterPanel(false)} onApply={setActiveFilters} />
      <JobDetailModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        applied={selectedJob ? applied.has(selectedJob.id) : false}
        onApply={() => { if (selectedJob) handleApply(selectedJob.id); }}
        onSave={() => { if (selectedJob) { toggleSave(selectedJob.id); setSelectedJob(prev => prev ? { ...prev, saved: !prev.saved } : prev); } }}
      />

      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <button onClick={() => navigate("/profile")} className="text-gray-500 hover:text-[#1a5cdb] transition-colors p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[#0d2657] font-bold text-lg">Job Search</span>
          <button
            onClick={() => setShowNotifs(true)}
            className="text-gray-500 hover:text-[#1a5cdb] transition-colors p-1 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">{unreadCount}</span>
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search Bar */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 bg-gray-50 focus-within:border-[#1a5cdb] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search job title, company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={14} />
                </button>
              )}
              <button
                onClick={() => setShowFilterPanel(true)}
                className="text-gray-400 hover:text-[#1a5cdb] transition-colors"
              >
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar" onClick={closeDropdowns}>
            {/* Degree */}
            <div className="relative shrink-0">
              <button
                ref={degreeRef}
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === "degree" ? null : "degree"); }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${openDropdown === "degree" || degreeFilter !== "Any Degree" ? "bg-[#0d2657] text-white" : "bg-[#0d2657] text-white"} hover:bg-[#1a3a6b]`}
              >
                {degreeFilter === "Any Degree" ? "Degree" : degreeFilter}
                <ChevronDown size={13} className={`transition-transform ${openDropdown === "degree" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "degree" && (
                <FilterDropdown label="Degree" options={DEGREE_OPTIONS} selected={degreeFilter} onSelect={setDegreeFilter} onClose={() => setOpenDropdown(null)} anchorRef={degreeRef} />
              )}
            </div>

            {/* Skill */}
            <div className="relative shrink-0">
              <button
                ref={skillRef}
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === "skill" ? null : "skill"); }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#0d2657] text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-[#1a3a6b] transition-colors"
              >
                {skillFilter}
                <ChevronDown size={13} className={`transition-transform ${openDropdown === "skill" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "skill" && (
                <FilterDropdown label="Skill" options={SKILL_OPTIONS} selected={skillFilter} onSelect={setSkillFilter} onClose={() => setOpenDropdown(null)} anchorRef={skillRef} />
              )}
            </div>

            {/* Location */}
            <div className="relative shrink-0">
              <button
                ref={locationRef}
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === "location" ? null : "location"); }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#0d2657] text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-[#1a3a6b] transition-colors"
              >
                {locationFilter === "Anywhere" ? "Location" : locationFilter.split(",")[0]}
                <ChevronDown size={13} className={`transition-transform ${openDropdown === "location" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "location" && (
                <FilterDropdown label="Location" options={LOCATION_OPTIONS} selected={locationFilter} onSelect={setLocationFilter} onClose={() => setOpenDropdown(null)} anchorRef={locationRef} />
              )}
            </div>
          </div>

          {/* Section Title */}
          <div className="px-4 pb-2 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
            <span className="text-[#0d2657] font-bold text-base">
              {showAll ? `All Jobs (${filtered.length})` : "Hand-Picked for You"}
            </span>
            <button
              onClick={() => setShowAll(v => !v)}
              className="text-[#1a5cdb] text-sm hover:underline flex items-center gap-1"
            >
              {showAll ? "Show less" : `See all ${filtered.length}`}
              <ChevronRight size={14} className={`transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Job Cards */}
          <div className="px-4 pb-4 space-y-4">
            {displayed.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-2xl p-4 hover:border-[#1a5cdb] hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: job.logoBg }}>
                      <img src={COMPANY_LOGOS[job.logoIndex]} alt={job.company} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#0d2657] font-bold text-sm leading-snug">{job.title}</h3>
                      <p className="text-gray-400 text-xs mt-0.5">{job.company} · {job.location}</p>
                    </div>
                  </div>
                  <MatchBadge match={job.match} />
                </div>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-gray-500 text-xs">
                  <span className="flex items-center gap-1"><DollarSign size={12} className="text-gray-400" />{job.salary}</span>
                  <span className="flex items-center gap-1"><BriefcaseBusiness size={12} className="text-gray-400" />{job.type}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-gray-400" />{job.posted}</span>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={applied.has(job.id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${applied.has(job.id) ? "bg-green-600 text-white cursor-default" : "bg-[#0d2657] hover:bg-[#1a3a6b] text-white"}`}
                  >
                    {applied.has(job.id) ? "Applied ✓" : "Apply Now"}
                  </button>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${job.saved ? "border-[#1a5cdb] bg-blue-50 text-[#1a5cdb]" : "border-gray-200 text-gray-400 hover:border-[#1a5cdb] hover:text-[#1a5cdb]"}`}
                  >
                    <Bookmark size={16} fill={job.saved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <BriefcaseBusiness size={22} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">No jobs match your filters.</p>
                <button onClick={() => { setSearch(""); setActiveFilters({ minSalary: 0, jobType: [], isRemote: false }); setDegreeFilter("Any Degree"); setSkillFilter("UX Research"); setLocationFilter("Anywhere"); }} className="text-[#1a5cdb] text-sm hover:underline mt-1">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav variant="jobs" />
      </div>
    </>
  );
}
