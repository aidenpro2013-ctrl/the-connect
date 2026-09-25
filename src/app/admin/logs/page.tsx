"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";

type Log = { id: number; action: string; user: string; detail: string; at: string };

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("the_connect_logs");
    if (raw) setLogs(JSON.parse(raw));
    else {
      const seed: Log[] = [
        { id: 1, action: "login", user: "Aiden Armstrong", detail: "Signed in", at: new Date().toLocaleString() },
        { id: 2, action: "match", user: "Aiden Armstrong", detail: "Matched with Elizabeth", at: new Date(Date.now() - 3600000).toLocaleString() },
        { id: 3, action: "call", user: "Jordan Lee", detail: "Started voice call with Sam Rivera", at: new Date(Date.now() - 7200000).toLocaleString() },
        { id: 4, action: "report", user: "Elizabeth", detail: "Reported Sam Rivera", at: new Date(Date.now() - 86400000).toLocaleString() },
      ];
      setLogs(seed);
      localStorage.setItem("the_connect_logs", JSON.stringify(seed));
    }
  }, []);

  const color = (action: string) => {
    if (action === "report") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    if (action === "match") return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";
    if (action === "call") return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300";
    return "bg-[rgb(var(--bg))] text-[rgb(var(--muted))]";
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-1">Activity Logs</h1>
        <p className="text-sm text-[rgb(var(--muted))] mb-6">Full accountability trail for admins and owners</p>
        <div className="space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="flex items-start gap-3 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-3">
              <span className={`text-[10px] font-semibold uppercase px-2 py-1 rounded ${color(l.action)}`}>{l.action}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm"><span className="font-medium">{l.user}</span> <span className="text-[rgb(var(--muted))]">{l.detail}</span></div>
                <div className="text-xs text-[rgb(var(--muted))] mt-0.5">{l.at}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
