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
  photo?: string | null;
};

export default function CommunityPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    const stored = getMessages("community");
    if (stored.length) {
      setMessages(stored);
    } else {
      const seed: Msg[] = [
        {
          id: 1,
          user: "Aiden Armstrong",
          text: "Welcome to THE Connect community chat! 👋",
          time: "earlier",
          mine: false,
        },
        {
          id: 2,
          user: "Elizabeth",
          text: "Hey everyone! Excited to be here.",
          time: "earlier",
          mine: false,
        },
      ];
      setMessages(seed);
      saveMessages("community", seed);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !user) return;
    const msg: Msg = {
      id: Date.now(),
      user: user.full_name || "You",
      text: input.trim(),
      time: "now",
      mine: true,
      photo: user.photo,
    };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages("community", next);
    setInput("");
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <h1 className="text-xl font-bold mb-4">Community Chat</h1>
        <div className="flex-1 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.mine ? "justify-end" : "justify-start"}`}
              >
                {!m.mine && (
                  <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {m.user.charAt(0)}
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    m.mine
                      ? "bg-[rgb(var(--primary))] text-white"
                      : "bg-[rgb(var(--bg))]"
                  }`}
                >
                  {!m.mine && (
                    <div className="text-xs font-semibold mb-0.5 opacity-80">
                      {m.user}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{m.text}</div>
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
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Say something…"
              className="flex-1 h-11 px-4 rounded-full border border-[rgb(var(--border))] bg-transparent text-sm outline-none focus:border-[rgb(var(--primary))]"
            />
            <button
              onClick={send}
              className="h-11 px-5 rounded-full bg-[rgb(var(--primary))] text-white text-sm font-medium hover:bg-[rgb(var(--primary-hover))]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
