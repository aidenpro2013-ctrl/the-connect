"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";

type Report = { id: number; reporter: string; target: string; reason: string; details: string; at: string; status: "open" | "reviewed" };

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("the_connect_reports");
    if (raw) setReports(JSON.parse(raw));
    else {
      const seed: Report[] = [{ id: 1, reporter: "Elizabeth", target: "Sam Rivera", reason: "Inappropriate messages", details: "Sent unsolicited messages after being asked to stop.", at: new Date(Date.now() - 86400000).toLocaleString(), status: "open" }];
      setReports(seed);
      localStorage.setItem("the_connect_reports", JSON.stringify(seed));
    }
  }, []);

  const markReviewed = (id: number) => {
    const next = reports.map((r) => (r.id === id ? { ...r, status: "reviewed" as const } : r));
    setReports(next);
    localStorage.setItem("the_connect_reports", JSON.stringify(next));
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-1">Reports</h1>
        <p className="text-sm text-[rgb(var(--muted))] mb-6">Review misuse reports from the community</p>
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-8 text-center text-[rgb(var(--muted))] text-sm">No reports yet.</div>
          ) : (
            reports.map((r) => (
              <div key={r.id} className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-sm">{r.target} <span className="font-normal text-[rgb(var(--muted))]">reported by {r.reporter}</span></div>
                    <div className="text-sm mt-1"><span className="font-medium">{r.reason}</span>{r.details && <span className="text-[rgb(var(--muted))]"> — {r.details}</span>}</div>
                    <div className="text-xs text-[rgb(var(--muted))] mt-2">{r.at}</div>
                  </div>
                  {r.status === "open" ? (
                    <button onClick={() => markReviewed(r.id)} className="text-xs px-3 py-1.5 rounded-lg bg-[rgb(var(--primary))] text-white shrink-0">Mark reviewed</button>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Reviewed</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
