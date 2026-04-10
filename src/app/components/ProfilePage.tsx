import { useState } from "react";
import {
  Settings, Award, CheckCircle2, Plus, FileText, X,
  Bell, Shield, Moon, Eye, Pencil, GraduationCap, Download,
} from "lucide-react";
import { Layout } from "./Layout";
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
          <button onClick={handleGenerate} disabled={generating}
            className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-70">
            {generating
              ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Generating…</>
              : <><FileText size={15} /> Generate CV</>}
          </button>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-3">
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
            <button onClick={handleDownload}
              className="flex-1 bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all">
              <Download size={15} /> Download PDF
            </button>
            <button onClick={() => setGenerated(false)}
              className="px-4 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Edit
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ─── All Honors Modal ─────────────────────────────────────────── */
function HonorsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="All Academic Honors">
      <div className="p-5 space-y-3">
        {ALL_HONORS.map((h) => (
          <div key={h.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {h.icon === "award" ? <Award size={20} className="text-[#1a5cdb]" /> : <CheckCircle2 size={20} className="text-[#1a5cdb]" />}
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

/* ─── Certificates Modal ─────────────────────────────────────────── */
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

/* ─── Edit Skills Modal ─────────────────────────────────────────── */
function EditSkillsModal({ open, onClose, skills, onSave }: {
  open: boolean; onClose: () => void; skills: string[]; onSave: (s: string[]) => void;
}) {
  const [local, setLocal] = useState<string[]>(skills);
  const [input, setInput] = useState("");

  const add = () => {
    if (input.trim() && !local.includes(input.trim())) { setLocal([...local, input.trim()]); setInput(""); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Skills">
      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a new skill…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#1a5cdb] transition-colors" />
          <button onClick={add} className="px-4 bg-[#0d2657] text-white rounded-lg text-sm font-semibold hover:bg-[#1a3a6b] transition-colors">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[60px]">
          {local.map((skill) => (
            <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-[#0d2657]">
              {skill}
              <button onClick={() => setLocal(local.filter(x => x !== skill))} className="text-blue-300 hover:text-red-400 transition-colors"><X size={12} /></button>
            </span>
          ))}
          {local.length === 0 && <p className="text-gray-400 text-sm">No skills added yet.</p>}
        </div>
        <button onClick={() => { onSave(local); showToast("Skills updated!", "success"); onClose(); }}
          className="w-full bg-[#0d2657] hover:bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm transition-all">
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
        {semesters.map((s) => (
          <div key={s.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600">{s.name}</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0d2657] rounded-full" style={{ width: `${(s.gpa / 4) * 100}%` }} />
              </div>
              <span className="text-sm font-semibold text-[#0d2657] w-8 text-right">{s.gpa}</span>
            </div>
          </div>
        ))}
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
  const [showEditSkills, setShowEditSkills] = useState(false);
  const [showGPA, setShowGPA] = useState(false);

  return (
    <>
      <CVModal open={showCV} onClose={() => setShowCV(false)} />
      <HonorsModal open={showAllHonors} onClose={() => setShowAllHonors(false)} />
      <CertsModal open={showCerts} onClose={() => setShowCerts(false)} />
      <EditSkillsModal open={showEditSkills} onClose={() => setShowEditSkills(false)} skills={skills} onSave={setSkills} />
      <GPAModal open={showGPA} onClose={() => setShowGPA(false)} />

      <Layout>
        <main className="flex-1 overflow-y-auto">
          {/* ── Profile Hero Banner ── */}
          <div className="relative" style={{ background: "linear-gradient(135deg, #0d1e3d 0%, #1a3a6b 100%)" }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />

            <div className="relative z-10 px-8 pt-8 pb-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white/30 overflow-hidden shadow-xl">
                    <img src={AVATAR} alt="Alex Johnson" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#1a5cdb] border-2 border-white flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>

                {/* Name & Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <h1 className="text-white text-3xl font-bold">Alex Johnson</h1>
                  <p className="text-blue-200 text-sm mt-1">Verified Alumnus · Class of 2020 · B.S. Business Administration</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-white text-xs font-medium">
                      <GraduationCap size={12} /> State University
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-xs font-medium">
                      ● Open to Work
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <button onClick={() => setShowCV(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0d2657] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all shadow-sm">
                    <FileText size={16} /> Generate CV
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-6 pt-5 border-t border-white/10">
                <button onClick={() => setShowGPA(true)} className="text-left hover:opacity-80 transition-opacity group">
                  <p className="text-white text-2xl font-bold group-hover:text-blue-200 transition-colors">3.9</p>
                  <p className="text-blue-300 text-xs font-semibold tracking-wider">GPA / 4.0</p>
                </button>
                <div className="w-px h-8 bg-white/20" />
                <button onClick={() => setShowCerts(true)} className="text-left hover:opacity-80 transition-opacity group">
                  <p className="text-white text-2xl font-bold group-hover:text-blue-200 transition-colors">12</p>
                  <p className="text-blue-300 text-xs font-semibold tracking-wider">CERTIFICATES</p>
                </button>
                <div className="w-px h-8 bg-white/20" />
                <button onClick={() => setShowAllHonors(true)} className="text-left hover:opacity-80 transition-opacity group">
                  <p className="text-white text-2xl font-bold group-hover:text-blue-200 transition-colors">5</p>
                  <p className="text-blue-300 text-xs font-semibold tracking-wider">HONORS</p>
                </button>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-left">
                  <p className="text-white text-2xl font-bold">47</p>
                  <p className="text-blue-300 text-xs font-semibold tracking-wider">CONNECTIONS</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content Grid ── */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left / Main Column ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Academic Honors */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0d2657] font-bold text-lg">Academic Honors</h2>
                  <button onClick={() => setShowAllHonors(true)} className="text-[#1a5cdb] text-sm hover:underline font-medium">View All (5)</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ALL_HONORS.slice(0, 4).map((h) => (
                    <div key={h.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        {h.icon === "award" ? <Award size={20} className="text-[#1a5cdb]" /> : <CheckCircle2 size={20} className="text-[#1a5cdb]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0d2657] font-semibold text-sm">{h.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-snug">{h.desc}</p>
                        <p className="text-gray-300 text-xs mt-1">{h.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Skills */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0d2657] font-bold text-lg">Professional Skills</h2>
                  <button onClick={() => setShowEditSkills(true)}
                    className="text-[#1a5cdb] text-sm hover:underline font-medium flex items-center gap-1">
                    <Pencil size={13} /> Edit Skills
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#1a5cdb] hover:text-[#1a5cdb] hover:bg-blue-50 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                  <button onClick={() => setShowEditSkills(true)}
                    className="px-4 py-2 border border-dashed border-[#1a5cdb] rounded-xl text-sm text-[#1a5cdb] flex items-center gap-1.5 hover:bg-blue-50 transition-colors">
                    <Plus size={14} /> Add Skill
                  </button>
                </div>
              </div>

              {/* Work Experience placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0d2657] font-bold text-lg">Work Experience</h2>
                  <button className="text-[#1a5cdb] text-sm hover:underline font-medium flex items-center gap-1">
                    <Plus size={13} /> Add
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { role: "Product Analyst", company: "TechFlow Systems", period: "Jan 2023 – Present", desc: "Led cross-functional product analysis initiatives, defining KPIs and driving 30% improvement in key metrics." },
                    { role: "Business Analyst Intern", company: "Blue Knight Corp", period: "Jun 2022 – Dec 2022", desc: "Supported strategic planning and market research across the enterprise product suite." },
                  ].map((job) => (
                    <div key={job.role} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-[#0d2657]/10 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2657" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
                      </div>
                      <div>
                        <p className="text-[#0d2657] font-semibold text-sm">{job.role}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{job.company} · {job.period}</p>
                        <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{job.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* GPA Card */}
              <button onClick={() => setShowGPA(true)}
                className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-left hover:border-blue-200 hover:shadow-md transition-all group">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Academic Performance</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-[#0d2657] text-4xl font-bold group-hover:text-[#1a5cdb] transition-colors">3.9</span>
                  <span className="text-gray-400 text-sm mb-1">/ 4.0 GPA</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 bg-[#0d2657] rounded-full" style={{ width: "97.5%" }} />
                </div>
                <p className="text-[#1a5cdb] text-xs font-medium mt-2">View semester breakdown →</p>
              </button>

              {/* Certifications */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0d2657] font-bold text-base">Certifications</h2>
                  <button onClick={() => setShowCerts(true)} className="text-[#1a5cdb] text-sm hover:underline font-medium">All 12</button>
                </div>
                <div className="space-y-2.5">
                  {ALL_CERTS.slice(0, 5).map((c) => (
                    <div key={c.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={15} className="text-[#1a5cdb]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0d2657] font-semibold text-xs truncate">{c.name}</p>
                        <p className="text-gray-400 text-xs truncate">{c.org}</p>
                      </div>
                      <span className="text-xs text-gray-300 shrink-0">{c.year}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowCerts(true)}
                  className="mt-3 w-full py-2 border border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:text-[#1a5cdb] hover:border-[#1a5cdb] transition-colors">
                  + 7 more certificates
                </button>
              </div>

              {/* Profile Completeness */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Profile Strength</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0d2657] font-bold text-lg">82%</span>
                  <span className="text-xs text-[#1a5cdb] font-medium">Strong</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className="h-2 bg-gradient-to-r from-[#0d2657] to-[#1a5cdb] rounded-full" style={{ width: "82%" }} />
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Add a profile photo", done: true },
                    { label: "Complete work experience", done: true },
                    { label: "Add 10+ skills", done: false },
                    { label: "Get 3+ endorsements", done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-green-100" : "bg-gray-100"}`}>
                        {item.done ? <CheckCircle2 size={11} className="text-green-600" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                      </div>
                      <span className={item.done ? "text-gray-400 line-through" : "text-gray-600"}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
