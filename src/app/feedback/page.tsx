"use client";
import AppShell from "@/components/AppShell";
import { getUser } from "@/lib/storage";
import { useEffect, useState } from "react";
type FB = { id: number; user: string; text: string; at: string };
export default function FeedbackPage() {
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState("");
  const [list, setList] = useState<FB[]>([]);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    setUser(getUser());
    const raw = localStorage.getItem("the_connect_feedback");
    if (raw) setList(JSON.parse(raw));
  }, []);
  const submit = () => {
    if (!text.trim()) return;
    const item: FB = { id: Date.now(), user: user?.full_name || "Anonymous", text: text.trim(), at: new Date().toLocaleString() };
    const next = [item, ...list];
    setList(next);
    localStorage.setItem("the_connect_feedback", JSON.stringify(next));
    setText("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };
  const isOwner = user?.role === "owner" || user?.role === "admin";
  return (
    <AppShell>
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-bold">Feedback</h1>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-6 space-y-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Tell us what you think…" className="w-full p-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          <button onClick={submit} className="w-full h-11 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium">{sent ? "Submitted ✓" : "Submit feedback"}</button>
        </div>
        {isOwner && list.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-sm">All feedback (admin)</h2>
            {list.map((f) => (
              <div key={f.id} className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4 text-sm">
                <div className="font-medium">{f.user}</div>
                <div className="mt-1">{f.text}</div>
                <div className="text-xs text-[rgb(var(--muted))] mt-2">{f.at}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
