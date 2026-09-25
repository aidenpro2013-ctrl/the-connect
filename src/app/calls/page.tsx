"use client";

import AppShell from "@/components/AppShell";
import { useState } from "react";

const members = [
  { id: 1, name: "Elizabeth", role: "user" },
  { id: 2, name: "Jordan Lee", role: "team_member" },
  { id: 3, name: "Sam Rivera", role: "user" },
  { id: 4, name: "Morgan", role: "user" },
  { id: 5, name: "Aiden Armstrong", role: "owner" },
];

export default function CallsPage() {
  const [activeCall, setActiveCall] = useState<{ name: string; type: "voice" | "video" } | null>(null);
  const [seconds, setSeconds] = useState(0);

  const startCall = (name: string, type: "voice" | "video") => {
    setActiveCall({ name, type });
    setSeconds(0);
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    (window as any).__callTimer = t;
  };

  const endCall = () => {
    if ((window as any).__callTimer) clearInterval((window as any).__callTimer);
    setActiveCall(null);
    setSeconds(0);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (activeCall) {
    return (
      <AppShell>
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#1A1F2E] to-[#2A2F45] flex flex-col items-center justify-center text-white">
          <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold mb-6">{activeCall.name.charAt(0)}</div>
          <h2 className="text-2xl font-bold">{activeCall.name}</h2>
          <p className="text-white/70 mt-1">{activeCall.type === "video" ? "Video call" : "Voice call"} · {fmt(seconds)}</p>
          <p className="text-sm text-white/50 mt-2">Camera/mic access will be requested in a future update</p>
          <div className="flex gap-6 mt-12">
            <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" x2="12" y1="19" y2="23" /><line x1="8" x2="16" y1="23" y2="23" /></svg>
            </button>
            <button onClick={endCall} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" /><line x1="23" x2="1" y1="1" y2="23" /></svg>
            </button>
            {activeCall.type === "video" && (
              <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
              </button>
            )}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-1">Calls</h1>
        <p className="text-sm text-[rgb(var(--muted))] mb-6">Voice & video calling with community members</p>
        <div className="space-y-2">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-3 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-3">
              <div className="w-11 h-11 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center font-semibold">{m.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{m.name}</div>
                <div className="text-xs text-[rgb(var(--muted))] capitalize">{m.role.replace("_", " ")}</div>
              </div>
              <button onClick={() => startCall(m.name, "voice")} className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center hover:bg-blue-200 transition" title="Voice call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </button>
              <button onClick={() => startCall(m.name, "video")} className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-200 transition" title="Video call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
