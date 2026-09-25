"use client";

import AppShell from "@/components/AppShell";
import Link from "next/link";
import { getUser } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => { setUser(getUser()); }, []);
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back{user ? `, ${user.full_name?.split(" ")[0]}` : ""} 👋</h1>
          <p className="text-[rgb(var(--muted))] mt-1">Connect with the Seabrook / CCISD community</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/community", label: "Community Chat", desc: "Talk with everyone", color: "bg-emerald-500" },
            { href: "/messages", label: "Messages", desc: "Private DMs", color: "bg-blue-500" },
            { href: "/dating", label: "Dating", desc: "Swipe & match", color: "bg-pink-500" },
            { href: "/calls", label: "Calls", desc: "Voice & video", color: "bg-violet-500" },
            { href: "/ai", label: "AI Assistant", desc: "24/7 help", color: "bg-amber-500" },
            { href: "/calendar", label: "Calendar", desc: "Events", color: "bg-cyan-500" },
            { href: "/links", label: "Link Hub", desc: "Share links", color: "bg-indigo-500" },
            { href: "/profile", label: "Profile", desc: "Your page", color: "bg-rose-500" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg ${item.color} mb-3`} />
              <div className="font-semibold text-sm">{item.label}</div>
              <div className="text-xs text-[rgb(var(--muted))]"">{item.desc}</div>
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-[rgb(var(--muted))]">Phone number sharing removed. Enjoy THE Connect!</p>
      </div>
    </AppShell>
  );
}
