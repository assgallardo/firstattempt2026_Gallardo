import { useState } from "react";
import { Search, UserPlus, UserCheck, MessageSquare, X } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { showToast } from "./Toast";

const WOMAN1 = "https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU3NDg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=200";
const MAN1 = "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNhc3VhbCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NTc5MDIxOHww&ixlib=rb-4.1.0&q=80&w=200";
const WOMAN2 = "https://images.unsplash.com/photo-1770364019741-3518f4f05513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwZXhlY3V0aXZlJTIwY29uZmlkZW50fGVufDF8fHx8MTc3NTc5MDIyMnww&ixlib=rb-4.1.0&q=80&w=200";
const TEAM = "https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHN8ZW58MXx8fHwxNzc1NzkwMjIyfDA&ixlib=rb-4.1.0&q=80&w=200";

type Person = {
  id: number; name: string; title: string; company: string;
  mutual: number; avatar: string; connected: boolean; requested: boolean;
};

const REQUESTS = [
  { id: 10, name: "Sarah Chen", title: "UX Designer @ Meta", avatar: WOMAN1, mutual: 8 },
  { id: 11, name: "Marcus Brown", title: "PM @ Stripe", avatar: MAN1, mutual: 4 },
];

const initialPeople: Person[] = [
  { id: 1, name: "Jamie Reyes", title: "Product Lead", company: "TechFlow Systems", mutual: 12, avatar: WOMAN2, connected: true, requested: false },
  { id: 2, name: "Tyler Okafor", title: "Data Scientist", company: "Google", mutual: 6, avatar: MAN1, connected: false, requested: false },
  { id: 3, name: "Priya Nair", title: "UX Researcher", company: "Apple", mutual: 9, avatar: WOMAN1, connected: false, requested: true },
  { id: 4, name: "Alex Kim", title: "Eng. Manager", company: "Microsoft", mutual: 3, avatar: TEAM, connected: false, requested: false },
  { id: 5, name: "Diana Flores", title: "Strategy Lead", company: "McKinsey", mutual: 7, avatar: WOMAN2, connected: true, requested: false },
];

export function NetworkPage() {
  const [people, setPeople] = useState(initialPeople);
  const [requests, setRequests] = useState(REQUESTS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"connections" | "discover">("discover");

  const toggle = (id: number) => {
    setPeople(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (p.connected) { showToast(`Removed connection.`, "info"); return { ...p, connected: false, requested: false }; }
      if (p.requested) { showToast(`Request withdrawn.`, "info"); return { ...p, requested: false }; }
      showToast(`Connection request sent!`, "success"); return { ...p, requested: true };
    }));
  };

  const acceptRequest = (id: number) => {
    const req = requests.find(r => r.id === id);
    if (req) showToast(`Connected with ${req.name}!`, "success");
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const dismissRequest = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    showToast("Request dismissed.", "info");
  };

  const filtered = people.filter(p => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q);
  });

  const connections = filtered.filter(p => p.connected);
  const discover = filtered.filter(p => !p.connected);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <span className="text-[#0d2657] font-bold text-lg tracking-wide">Network</span>
        <span className="text-sm text-gray-400">{connections.length} connections</span>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 bg-gray-50 focus-within:border-[#1a5cdb] transition-colors">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search people…" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
          {search && <button onClick={() => setSearch("")}><X size={14} className="text-gray-400" /></button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-2 flex gap-2">
        {(["discover", "connections"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${activeTab === t ? "bg-[#0d2657] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
            {t === "connections" ? `My Connections (${connections.length})` : "Discover"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Connection Requests */}
        {requests.length > 0 && activeTab === "discover" && (
          <div className="px-4 pt-1 pb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">{requests.length} Pending Request{requests.length > 1 ? "s" : ""}</p>
            <div className="space-y-2">
              {requests.map(r => (
                <div key={r.id} className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0d2657] font-semibold text-sm truncate">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.title}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => acceptRequest(r.id)} className="px-3 py-1.5 bg-[#0d2657] text-white rounded-lg text-xs font-semibold hover:bg-[#1a3a6b] transition-colors">Accept</button>
                    <button onClick={() => dismissRequest(r.id)} className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"><X size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* People List */}
        <div className="px-4 pb-4 space-y-2">
          {(activeTab === "connections" ? connections : discover).map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all">
              <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[#0d2657] font-semibold text-sm truncate">{p.name}</p>
                <p className="text-gray-400 text-xs truncate">{p.title} · {p.company}</p>
                <p className="text-gray-300 text-xs">{p.mutual} mutual connections</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {p.connected && (
                  <button onClick={() => showToast(`Opening chat with ${p.name}…`, "info")} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#1a5cdb] hover:border-[#1a5cdb] transition-colors">
                    <MessageSquare size={14} />
                  </button>
                )}
                <button
                  onClick={() => toggle(p.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${p.connected ? "border border-green-300 bg-green-50 text-green-600" : p.requested ? "border border-[#1a5cdb] bg-blue-50 text-[#1a5cdb]" : "border border-gray-200 text-gray-500 hover:border-[#1a5cdb] hover:text-[#1a5cdb]"}`}
                >
                  {p.connected ? <UserCheck size={14} /> : <UserPlus size={14} />}
                </button>
              </div>
            </div>
          ))}
          {(activeTab === "connections" ? connections : discover).length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">No results found.</div>
          )}
        </div>
      </div>

      <BottomNav variant="profile" />
    </div>
  );
}
