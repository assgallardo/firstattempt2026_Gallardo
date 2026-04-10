import { useState } from "react";
import { Search, UserPlus, UserCheck, MessageSquare, X, Users } from "lucide-react";
import { Layout } from "./Layout";
import { showToast } from "./Toast";
import { useNavigate } from "react-router";

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
  { id: 6, name: "Jordan Lee", title: "Senior Designer", company: "Airbnb", mutual: 5, avatar: MAN1, connected: false, requested: false },
  { id: 7, name: "Aisha Patel", title: "Product Manager", company: "Meta", mutual: 11, avatar: WOMAN1, connected: false, requested: false },
  { id: 8, name: "Carlos Mendez", title: "Full Stack Engineer", company: "Stripe", mutual: 4, avatar: TEAM, connected: true, requested: false },
];

export function NetworkPage() {
  const navigate = useNavigate();
  const [people, setPeople] = useState(initialPeople);
  const [requests, setRequests] = useState(REQUESTS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"connections" | "discover">("discover");

  const toggle = (id: number) => {
    setPeople(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (p.connected) { showToast("Connection removed.", "info"); return { ...p, connected: false, requested: false }; }
      if (p.requested) { showToast("Request withdrawn.", "info"); return { ...p, requested: false }; }
      showToast("Connection request sent!", "success"); return { ...p, requested: true };
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
    return !q || p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) || p.title.toLowerCase().includes(q);
  });

  const connections = filtered.filter(p => p.connected);
  const discover = filtered.filter(p => !p.connected);
  const displayList = activeTab === "connections" ? connections : discover;

  return (
    <Layout>
      <main className="flex-1 overflow-y-auto p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#0d2657] font-bold text-3xl">Network</h1>
            <p className="text-gray-400 text-sm mt-1">{connections.length} connections · {discover.length} people to discover</p>
          </div>
        </div>

        {/* Search + Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex gap-4 flex-wrap items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px] flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 bg-gray-50 focus-within:border-[#1a5cdb] transition-colors">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Search by name, company, title…" value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
              {search && <button onClick={() => setSearch("")}><X size={14} className="text-gray-400" /></button>}
            </div>
            {/* Tabs */}
            <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-gray-50 shrink-0">
              {(["discover", "connections"] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab === t ? "bg-[#0d2657] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {t === "connections" ? `My Connections (${connections.length})` : `Discover (${discover.length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {requests.length > 0 && activeTab === "discover" && (
          <div className="mb-6">
            <h2 className="text-[#0d2657] font-bold text-base mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1a5cdb] text-white text-xs flex items-center justify-center font-bold">{requests.length}</span>
              Pending Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {requests.map(r => (
                <div key={r.id} className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0d2657] font-semibold text-sm truncate">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{r.mutual} mutual connections</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => acceptRequest(r.id)}
                      className="px-4 py-2 bg-[#0d2657] text-white rounded-xl text-xs font-semibold hover:bg-[#1a3a6b] transition-colors">Accept</button>
                    <button onClick={() => dismissRequest(r.id)}
                      className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors bg-white"><X size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* People Grid */}
        {displayList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Users size={40} strokeWidth={1} className="mx-auto mb-3" />
            <p className="text-sm">No people found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayList.map((p) => (
              <div key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-5 flex flex-col items-center text-center group">
                <div className="relative mb-3">
                  <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors" />
                  {p.connected && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <p className="text-[#0d2657] font-bold text-sm">{p.name}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{p.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{p.company}</p>
                <p className="text-gray-300 text-xs mt-1">{p.mutual} mutual</p>

                <div className="flex gap-2 mt-4 w-full">
                  {p.connected && (
                    <button onClick={() => { showToast(`Opening chat with ${p.name}…`, "info"); navigate("/messages"); }}
                      className="flex-1 py-2 border border-gray-200 rounded-xl text-gray-500 hover:text-[#1a5cdb] hover:border-[#1a5cdb] transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold">
                      <MessageSquare size={13} /> Message
                    </button>
                  )}
                  <button onClick={() => toggle(p.id)}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all ${
                      p.connected
                        ? "border border-green-200 bg-green-50 text-green-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                        : p.requested
                        ? "border border-[#1a5cdb] bg-blue-50 text-[#1a5cdb]"
                        : "bg-[#0d2657] text-white hover:bg-[#1a3a6b]"
                    }`}>
                    {p.connected ? <><UserCheck size={13} /> Connected</> : p.requested ? "Requested" : <><UserPlus size={13} /> Connect</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
