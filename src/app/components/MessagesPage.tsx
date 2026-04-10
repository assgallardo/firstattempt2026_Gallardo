import { useState, useRef, useEffect } from "react";
import { Send, Search, MoreVertical, Phone, Video, X, MessageSquare } from "lucide-react";
import { Layout } from "./Layout";

const WOMAN1 = "https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU3NDg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=200";
const MAN1 = "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNhc3VhbCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NTc5MDIxOHww&ixlib=rb-4.1.0&q=80&w=200";
const WOMAN2 = "https://images.unsplash.com/photo-1770364019741-3518f4f05513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwZXhlY3V0aXZlJTIwY29uZmlkZW50fGVufDF8fHx8MTc3NTc5MDIyMnww&ixlib=rb-4.1.0&q=80&w=200";

type Message = { id: number; text: string; from: "me" | "them"; time: string };
type Conversation = {
  id: number; name: string; role: string; avatar: string;
  lastMsg: string; time: string; unread: number; messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1, name: "Jamie Reyes", role: "Product Lead @ TechFlow", avatar: WOMAN2,
    lastMsg: "Your profile looks great! We'd love to chat.", time: "2m", unread: 2,
    messages: [
      { id: 1, text: "Hi Alex! I came across your profile and I'm really impressed.", from: "them", time: "10:03 AM" },
      { id: 2, text: "Thank you, Jamie! I appreciate that.", from: "me", time: "10:05 AM" },
      { id: 3, text: "Your profile looks great! We'd love to chat about a senior role.", from: "them", time: "10:07 AM" },
    ],
  },
  {
    id: 2, name: "Marcus Brown", role: "PM @ Stripe", avatar: MAN1,
    lastMsg: "Did you get a chance to review the JD?", time: "1h", unread: 1,
    messages: [
      { id: 1, text: "Hey Alex, I sent over a job description last week.", from: "them", time: "Yesterday" },
      { id: 2, text: "Yes, I saw it! Looks very interesting.", from: "me", time: "Yesterday" },
      { id: 3, text: "Did you get a chance to review the JD fully?", from: "them", time: "1h ago" },
    ],
  },
  {
    id: 3, name: "Sarah Chen", role: "UX Designer @ Meta", avatar: WOMAN1,
    lastMsg: "Let me know if you want to grab coffee!", time: "3d", unread: 0,
    messages: [
      { id: 1, text: "Alex! Great to connect here. How are you?", from: "them", time: "3 days ago" },
      { id: 2, text: "Doing great! Hope you're well too.", from: "me", time: "3 days ago" },
      { id: 3, text: "Let me know if you want to grab coffee sometime!", from: "them", time: "3 days ago" },
    ],
  },
];

export function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConv, setActiveConv] = useState<Conversation | null>(initialConversations[0]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages.length]);

  const sendMessage = () => {
    if (!input.trim() || !activeConv) return;
    const newMsg: Message = { id: Date.now(), text: input.trim(), from: "me", time: "Just now" };
    const updated = conversations.map(c =>
      c.id === activeConv.id
        ? { ...c, messages: [...c.messages, newMsg], lastMsg: input.trim(), time: "Just now", unread: 0 }
        : c
    );
    setConversations(updated);
    setActiveConv({ ...activeConv, messages: [...activeConv.messages, newMsg] });
    setInput("");

    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, text: "Thanks for your message! I'll get back to you shortly.", from: "them", time: "Just now" };
      setConversations(prev => prev.map(c =>
        c.id === activeConv.id ? { ...c, messages: [...c.messages, newMsg, reply], lastMsg: reply.text } : c
      ));
      setActiveConv(prev => prev ? { ...prev, messages: [...prev.messages, newMsg, reply] } : prev);
    }, 1500);
  };

  const openConv = (conv: Conversation) => {
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
    setActiveConv({ ...conv, unread: 0 });
  };

  const filteredConvs = conversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((a, c) => a + c.unread, 0);

  return (
    <Layout noScroll>
      {/* ── Conversations Panel ── */}
      <div className="w-80 flex flex-col border-r border-gray-200 bg-white shrink-0">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-[#0d2657] font-bold text-xl">Messages</h1>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 bg-[#0d2657] text-white text-xs rounded-full font-semibold">{totalUnread} new</span>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 shrink-0">
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-2 bg-gray-50 focus-within:border-[#1a5cdb] transition-colors">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Search messages…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => {
            const isActive = activeConv?.id === conv.id;
            return (
              <button key={conv.id} onClick={() => openConv(conv)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 transition-colors text-left ${isActive ? "bg-blue-50 border-r-2 border-[#0d2657]" : "hover:bg-gray-50"}`}>
                <div className="relative shrink-0">
                  <img src={conv.avatar} alt={conv.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${conv.unread > 0 ? "text-[#0d2657] font-bold" : "text-gray-800 font-semibold"}`}>{conv.name}</p>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#0d2657] text-white text-[10px] flex items-center justify-center font-bold shrink-0">{conv.unread}</div>
                )}
              </button>
            );
          })}
          {filteredConvs.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No conversations found.</div>
          )}
        </div>
      </div>

      {/* ── Chat Panel ── */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white shrink-0">
              <div className="relative">
                <img src={activeConv.avatar} alt={activeConv.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0d2657] font-bold text-base truncate">{activeConv.name}</p>
                <p className="text-xs text-gray-400 truncate">{activeConv.role}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#1a5cdb] rounded-xl hover:bg-gray-100 transition-colors"><Phone size={17} /></button>
                <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#1a5cdb] rounded-xl hover:bg-gray-100 transition-colors"><Video size={17} /></button>
                <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#1a5cdb] rounded-xl hover:bg-gray-100 transition-colors"><MoreVertical size={17} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {activeConv.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "them" && (
                    <img src={activeConv.avatar} alt="" className="w-8 h-8 rounded-full object-cover mr-2.5 self-end shrink-0" />
                  )}
                  <div className={`max-w-[60%] rounded-2xl px-4 py-3 ${msg.from === "me" ? "bg-[#0d2657] text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[11px] mt-1.5 ${msg.from === "me" ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center gap-3 shrink-0">
              <div className="flex-1 flex items-center border border-gray-200 rounded-2xl px-4 py-2.5 gap-2 focus-within:border-[#1a5cdb] transition-colors bg-gray-50">
                <input type="text" placeholder="Type a message…" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent" />
              </div>
              <button onClick={sendMessage} disabled={!input.trim()}
                className="w-11 h-11 bg-[#0d2657] text-white rounded-2xl flex items-center justify-center hover:bg-[#1a3a6b] transition-all disabled:opacity-40 shrink-0 shadow-sm">
                <Send size={17} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            <MessageSquare size={52} strokeWidth={1} />
            <p className="mt-3 text-sm">Select a conversation</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
