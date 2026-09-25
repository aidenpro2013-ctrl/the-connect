"use client";

import AppShell from "@/components/AppShell";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "How does THE Connect work?",
  "What safety features are there?",
  "Tell me about Dating",
  "How do I report someone?",
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("safety") || q.includes("report") || q.includes("flag"))
    return "Safety is built in: real names only, report button on profiles, flagged accounts can't submit new activity until reviewed, and admins/owners see full activity logs.";
  if (q.includes("dating") || q.includes("match") || q.includes("swipe"))
    return "Dating lets you create a profile, then swipe on other members. Mutual likes create a Match — see them in Matches and message them.";
  if (q.includes("call") || q.includes("video") || q.includes("voice"))
    return "Go to the Calls tab to start a voice or video call. You'll get a full-screen call UI with a timer.";
  if (q.includes("message") || q.includes("chat") || q.includes("community"))
    return "Community Chat is open to everyone. Private Messages lets you DM specific people. Dating matches also unlock private chat.";
  if (q.includes("how") && q.includes("work"))
    return "THE Connect is a community platform for Seabrook / CCISD with messaging, Dating, calls, AI, calendar, link hub, and admin tools. Phone number sharing was removed.";
  if (q.includes("aiden") || q.includes("creator"))
    return "Aiden Armstrong created THE Connect. Read more on the About page.";
  return "I'm the THE Connect assistant. Ask me about the app, safety, Dating, messaging, calls, or reporting!";
}

export default function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I'm the THE Connect AI assistant — available 24/7. Ask me about the app, safety, Dating, calls, or anything else." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply(value) }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <h1 className="text-xl font-bold mb-4">AI Assistant</h1>
        <div className="flex-1 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-[rgb(var(--primary))] text-white" : "bg-[rgb(var(--bg))]"}`}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[rgb(var(--bg))] rounded-2xl px-4 py-2.5 text-sm text-[rgb(var(--muted))]">Thinking…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {messages.length < 3 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] transition">{s}</button>
              ))}
            </div>
          )}
          <div className="p-3 border-t border-[rgb(var(--border))] flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything…" className="flex-1 h-11 px-4 rounded-full border border-[rgb(var(--border))] bg-transparent text-sm outline-none focus:border-[rgb(var(--primary))]" />
            <button onClick={() => send()} className="h-11 px-5 rounded-full bg-[rgb(var(--primary))] text-white text-sm font-medium">Send</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
