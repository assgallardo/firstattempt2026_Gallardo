import { useState } from "react";
import {
  Settings, Award, CheckCircle2, Plus, FileText, X, Trash2,
  Bell, Shield, Moon, ChevronRight, Download, Eye, Pencil, GraduationCap,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import { Modal } from "./Modal";
import { showToast } from "./Toast";

const AVATAR =
  "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc1Nzg5ODQyfDA&ixlib=rb-4.1.0&q=80&w=400";

const ALL_HONORS = [
  { icon: "award", title: "Dean's List", desc: "Awarded for 6 consecutive semesters", year: "2018–2020" },
  { icon: "check", title: "Summa Cum Laude", desc: "Top 1% of the graduating class", year: "2020" },
  { icon: "award", title: "Excellence in Leadership", desc: "Student Government Award", year: "2019" },
  { icon: "check", title: "National Merit Scholar", desc: "Academic merit recognition", year: "2016" },
  { icon: "award", title: "Beta Gamma Sigma", desc: "Business honor society inductee", year: "2019" },
];

const ALL_CERTS = [
  { name: "Google Data Analytics", org: "Google / Coursera", year: "2022" },
  { name: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2023" },
  { name: "PMP Certification", org: "Project Management Institute", year: "2021" },
  { name: "Certified Scrum Master", org: "Scrum Alliance", year: "2022" },
  { name: "SQL Advanced", org: "HackerRank", year: "2021" },
  { name: "UX Design Professional", org: "Google / Coursera", year: "2023" },
  { name: "Tableau Desktop Specialist", org: "Tableau", year: "2022" },
  { name: "Microsoft Azure Fundamentals", org: "Microsoft", year: "2023" },
  { name: "Lean Six Sigma Green Belt", org: "IASSC", year: "2021" },
  { name: "Python for Data Science", org: "DataCamp", year: "2022" },
  { name: "Digital Marketing", org: "HubSpot Academy", year: "2020" },
  { name: "Product Management", org: "Product School", year: "2023" },
];

const initialSkills = [
  "Product Strategy", "Data Analysis", "SQL", "Python",
  "Project Management", "UX Research",
];

/* ─── CV Modal ─────────────────────────────────────────────── */
function CVModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); showToast("CV generated successfully!", "success"); }, 1800);
  };

  const handleDownload = () => {
    showToast("Downloading CV as PDF…", "info");
    setTimeout(() => showToast("CV downloaded!", "success"), 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Professional CV" size="lg">
      {!generated ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-500">Generate a polished, ATS-optimised CV from your Career Passport profile.</p>
          <div className="space-y-2">
            {["Personal Information", "Academic Honors & GPA", "Professional Skills", "Work Experience", "Certifications"].map((section) => (
              <label key={section} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" defaultChecked className="accent-[#0d2657] w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">{section}</span>
              </label>
            ))}
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">Template Style</label>
            <div className="grid grid-cols-3 gap-2">
              {["Classic", "Modern", "Executive"].map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="template" value={t} defaultChecked={i === 1} className="sr-only peer" />
                  <div className="peer-checked:border-[#0d2657] peer-checked:bg-blue-50 border-2 border-gray-200 rounded-xl p-2.5 text-center transition-all">
                    <div className={`w-full h-8 rounded mb-1 ${i === 0 ? "bg-gray-200" : i === 1 ? "bg-[#0d2657]/20" : "bg-amber-100"}`} />
                    <span className="text-xs text-gray-600">{t}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70"
          >
            {generating ? (
              <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Generating…</>
            ) : (<><FileText size={15} /> Generate CV</>)}
          </button>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          {/* CV Preview */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
            <div className="border-b border-gray-200 pb-3">
              <p className="text-[#0d2657] font-bold text-base">Alex Johnson</p>
              <p className="text-gray-500 text-xs">Verified Alumnus · Class of 2020</p>
              <p className="text-gray-400 text-xs">alex.johnson@university.edu · (555) 012-3456</p>
            </div>
            <div>
              <p className="text-[#0d2657] font-semibold text-xs uppercase tracking-wider mb-1">Education</p>
              <p className="text-gray-700 text-xs">B.S. Business Administration — GPA 3.9/4.0</p>
              <p className="text-gray-500 text-xs">State University · Class of 2020</p>
            </div>
            <div>
              <p className="text-[#0d2657] font-semibold text-xs uppercase tracking-wider mb-1">Skills</p>
              <p className="text-gray-700 text-xs">Product Strategy · Data Analysis · SQL · Python · Project Management · UX Research</p>
            </div>
            <div>
              <p className="text-[#0d2657] font-semibold text-xs uppercase tracking-wider mb-1">Honors & Awards</p>
              <p className="text-gray-700 text-xs">Dean's List (6 semesters) · Summa Cum Laude · National Merit Scholar</p>
            </div>
            <div className="text-center pt-1">
              <span className="text-[10px] text-gray-300 italic">…preview truncated…</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all"
            >
              <Download size={15} /> Download PDF
            </button>
            <button
              onClick={() => { setGenerated(false); }}
              className="px-4 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ─── All Honors Modal ─────────────────────────────────────── */
function HonorsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="All Academic Honors">
      <div className="p-5 space-y-3">
        {ALL_HONORS.map((h) => (
          <div key={h.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {h.icon === "award"
                ? <Award size={20} className="text-[#1a5cdb]" />
                : <CheckCircle2 size={20} className="text-[#1a5cdb]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#0d2657] font-semibold text-sm">{h.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{h.desc}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0">{h.year}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ─── Certificates Modal ─────────────────────────────────────── */
function CertsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="12 Certificates">
      <div className="p-5 space-y-2">
        {ALL_CERTS.map((c) => (
          <div key={c.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-[#0d2657] font-semibold text-sm">{c.name}</p>
              <p className="text-gray-400 text-xs">{c.org}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0 ml-2">{c.year}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

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
      className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-[#0d2657]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5.5 left-0.5" : "translate-x-0.5 left-0"}`} />
    </button>
  );

  const Section = ({ icon, title, desc, value, onChange }: { icon: React.ReactNode; title: string; desc: string; value: boolean; onChange: () => void }) => (
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

  const handleSave = () => { showToast("Settings saved!", "success"); onClose(); };

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

        <div className="pt-4 space-y-2">
          <button
            onClick={handleSave}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm transition-all"
          >
            Save Settings
          </button>
          <button
            onClick={() => { showToast("Logged out successfully.", "info"); }}
            className="w-full border border-red-200 text-red-500 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Edit Skills Modal ─────────────────────────────────────── */
function EditSkillsModal({
  open, onClose, skills, onSave,
}: { open: boolean; onClose: () => void; skills: string[]; onSave: (s: string[]) => void }) {
  const [local, setLocal] = useState<string[]>(skills);
  const [input, setInput] = useState("");

  const add = () => {
    if (input.trim() && !local.includes(input.trim())) {
      setLocal([...local, input.trim()]);
      setInput("");
    }
  };

  const remove = (s: string) => setLocal(local.filter((x) => x !== s));

  const handleSave = () => { onSave(local); showToast("Skills updated!", "success"); onClose(); };

  return (
    <Modal open={open} onClose={onClose} title="Edit Skills">
      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a new skill…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#1a5cdb] transition-colors"
          />
          <button onClick={add} className="px-4 bg-[#0d2657] text-white rounded-lg text-sm font-semibold hover:bg-[#1a3a6b] transition-colors">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[60px]">
          {local.map((skill) => (
            <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-[#0d2657]">
              {skill}
              <button onClick={() => remove(skill)} className="text-blue-300 hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          {local.length === 0 && <p className="text-gray-400 text-sm">No skills added yet.</p>}
        </div>
        <button onClick={handleSave} className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm transition-all">
          Save Changes
        </button>
      </div>
    </Modal>
  );
}

/* ─── GPA Modal ─────────────────────────────────────────────── */
function GPAModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const semesters = [
    { name: "Fall 2016", gpa: 3.7 }, { name: "Spring 2017", gpa: 3.8 },
    { name: "Fall 2017", gpa: 3.9 }, { name: "Spring 2018", gpa: 4.0 },
    { name: "Fall 2018", gpa: 4.0 }, { name: "Spring 2019", gpa: 3.9 },
    { name: "Fall 2019", gpa: 3.8 }, { name: "Spring 2020", gpa: 4.0 },
  ];
  return (
    <Modal open={open} onClose={onClose} title="GPA Breakdown">
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl p-3">
          <span className="text-[#0d2657] font-bold text-sm">Cumulative GPA</span>
          <span className="text-[#0d2657] font-bold text-xl">3.9 / 4.0</span>
        </div>
        <div className="space-y-2">
          {semesters.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{s.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d2657] rounded-full" style={{ width: `${(s.gpa / 4) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold text-[#0d2657] w-8 text-right">{s.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ─── ProfilePage ────────────────────────────────────────────── */
export function ProfilePage() {
  const [skills, setSkills] = useState(initialSkills);

  const [showCV, setShowCV] = useState(false);
  const [showAllHonors, setShowAllHonors] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditSkills, setShowEditSkills] = useState(false);
  const [showGPA, setShowGPA] = useState(false);

  const displayedHonors = ALL_HONORS.slice(0, 2);

  return (
    <>
      <CVModal open={showCV} onClose={() => setShowCV(false)} />
      <HonorsModal open={showAllHonors} onClose={() => setShowAllHonors(false)} />
      <CertsModal open={showCerts} onClose={() => setShowCerts(false)} />
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
      <EditSkillsModal open={showEditSkills} onClose={() => setShowEditSkills(false)} skills={skills} onSave={setSkills} />
      <GPAModal open={showGPA} onClose={() => setShowGPA(false)} />

      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-[#0d2657] font-bold text-lg tracking-wide">Career Passport</span>
          <button
            onClick={() => setShowSettings(true)}
            className="text-gray-500 hover:text-[#1a5cdb] transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Card */}
          <div className="flex flex-col items-center pt-6 pb-5 px-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#0d2657] overflow-hidden shadow-lg">
                <img src={AVATAR} alt="Alex Johnson" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1a5cdb] border-2 border-white flex items-center justify-center">
                <CheckCircle2 size={13} className="text-white" />
              </div>
            </div>

            {/* Name & Title */}
            <h2 className="mt-3 text-[#0d2657] font-bold text-xl">Alex Johnson</h2>
            <p className="text-gray-500 text-sm mt-0.5">Verified Alumnus · Class of 2020</p>

            {/* Generate CV Button */}
            <button
              onClick={() => setShowCV(true)}
              className="mt-4 w-full bg-[#0d2657] hover:bg-[#1a3a6b] active:scale-[0.98] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all"
            >
              <FileText size={16} />
              Generate Professional CV
            </button>
          </div>

          {/* Stats Row — each cell is clickable */}
          <div className="border-t border-b border-dashed border-gray-200 grid grid-cols-3 divide-x divide-dashed divide-gray-200 py-3">
            {/* GPA */}
            <button onClick={() => setShowGPA(true)} className="flex flex-col items-center py-1 hover:bg-gray-50 transition-colors rounded-lg group">
              <span className="text-[#0d2657] font-bold text-xl group-hover:text-[#1a5cdb] transition-colors">3.9</span>
              <span className="text-gray-400 text-[10px] font-semibold tracking-wider mt-0.5">GPA</span>
            </button>
            {/* Certificates */}
            <button onClick={() => setShowCerts(true)} className="flex flex-col items-center py-1 hover:bg-gray-50 transition-colors rounded-lg group">
              <span className="text-[#0d2657] font-bold text-xl group-hover:text-[#1a5cdb] transition-colors">12</span>
              <span className="text-gray-400 text-[10px] font-semibold tracking-wider mt-0.5">CERTIFICATES</span>
            </button>
            {/* Honors */}
            <button onClick={() => setShowAllHonors(true)} className="flex flex-col items-center py-1 hover:bg-gray-50 transition-colors rounded-lg group">
              <span className="text-[#0d2657] font-bold text-xl group-hover:text-[#1a5cdb] transition-colors">5</span>
              <span className="text-gray-400 text-[10px] font-semibold tracking-wider mt-0.5">HONORS</span>
            </button>
          </div>

          {/* Academic Honors */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#0d2657] font-bold text-base">Academic Honors</span>
              <button onClick={() => setShowAllHonors(true)} className="text-[#1a5cdb] text-sm hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {displayedHonors.map((h) => (
                <div key={h.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    {h.icon === "award"
                      ? <Award size={20} className="text-[#1a5cdb]" />
                      : <CheckCircle2 size={20} className="text-[#1a5cdb]" />}
                  </div>
                  <div>
                    <p className="text-[#0d2657] font-semibold text-sm">{h.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Professional Skills */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#0d2657] font-bold text-base">Professional Skills</span>
              <button
                onClick={() => setShowEditSkills(true)}
                className="text-[#1a5cdb] text-sm hover:underline flex items-center gap-1"
              >
                <Pencil size={12} />
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#1a5cdb] hover:text-[#1a5cdb] transition-colors"
                >
                  {skill}
                </span>
              ))}
              <button
                onClick={() => setShowEditSkills(true)}
                className="px-3 py-1.5 border border-dashed border-[#1a5cdb] rounded-full text-sm text-[#1a5cdb] flex items-center gap-1 hover:bg-blue-50 transition-colors"
              >
                <Plus size={13} />
                Add Skill
              </button>
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* Bottom Navigation */}
        <BottomNav variant="profile" />
      </div>
    </>
  );
}
