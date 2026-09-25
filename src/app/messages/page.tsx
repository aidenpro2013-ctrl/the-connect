"use client";

import AppShell from "@/components/AppShell";
import { getUser, getMessages, saveMessages } from "@/lib/storage";
import { useEffect, useState, useRef } from "react";

type Msg = {
  id: number;
  user: string;
  text: string;
  time: string;
  mine: boolean;
};

const CONTACTS = [
  { id: "elizabeth", name: "Elizabeth" },
  { id: "jordan", name: "Jordan Lee" },
  { id: "sam", name: "Sam Rivera" },
  { id: "morgan", name: "Morgan" },
];

export default function MessagesPage() {
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (!active) return;
    const stored = getMessages(`dm_${active}`);
    if (stored.length) {
      setMessages(stored);
    } else {
      setMessages([
        {
          id: 1,
          user: CONTACTS.find((c) => c.id === active)?.name || "Them",
          text: "Hey! Thanks for connecting on THE Connect 👋",
          time: "earlier",
          mine: false,
        },
      ]);
    }
  }, [active]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !active || !user) return;
    const msg: Msg = {
      id: Date.now(),
      user: user.full_name || "You",
      text: input.trim(),
      time: "now",
      mine: true,
    };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages(`dm_${active}`, next);
    setInput("");
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex gap-4">
        <div className="w-64 shrink-0 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[rgb(var(--border))] font-semibold text-sm">
            Messages
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONTACTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-[rgb(var(--bg))] transition ${
                  active === c.id ? "bg-[rgb(var(--bg))]" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center font-semibold text-sm">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{c.name}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">Tap to chat</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl overflow-hidden flex flex-col">
          {!active ? (
            <div className="flex-1 flex items-center justify-center text-[rgb(var(--muted))] text-sm">
              Select a conversation
            </div>
          ) : (
            <>
              <div className="p-3 border-b border-[rgb(var(--border))] font-semibold text-sm flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center text-xs font-semibold">
                  {CONTACTS.find((c) => c.id === active)?.name.charAt(0)}
                </div>
                {CONTACTS.find((c) => c.id === active)?.name}
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.mine
                          ? "bg-[rgb(var(--primary))] text-white"
                          : "bg-[rgb(var(--bg))]"
                      }`}
                    >
                      {m.text}
                      <div
                        className={`text-[10px] mt-1 ${
                          m.mine ? "text-white/70" : "text-[rgb(var(--muted))]"
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="p-3 border-t border-[rgb(var(--border))] flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  className="flex-1 h-11 px-4 rounded-full border border-[rgb(var(--border))] bg-transparent text-sm outline-none focus:border-[rgb(var(--primary))]"
                />
                <button
                  onClick={send}
                  className="h-11 px-5 rounded-full bg-[rgb(var(--primary))] text-white text-sm font-medium"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
