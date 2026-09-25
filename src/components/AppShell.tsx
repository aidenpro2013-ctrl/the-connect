"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, getTheme, saveTheme } from "@/lib/storage";

const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/messages", label: "Messages" },
  { href: "/dating", label: "Dating" },
  { href: "/calls", label: "Calls" },
  { href: "/ai", label: "AI Assistant" },
  { href: "/calendar", label: "Calendar" },
  { href: "/links", label: "Link Hub" },
  { href: "/feedback", label: "Feedback" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

const adminItems = [
  { href: "/admin/users", label: "Manage Users" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/logs", label: "Activity Logs" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.push("/");
      return;
    }
    setUser(u);
    const t = getTheme();
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, [router]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    saveTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const logout = () => {
    localStorage.removeItem("the_connect_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg))]">
        <div className="text-[rgb(var(--muted))]">Loading…</div>
      </div>
    );
  }

  const isAdmin = user.role === "admin" || user.role === "owner";

  return (
    <div className="min-h-screen flex bg-[rgb(var(--bg))]">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[rgb(var(--surface))] border-r border-[rgb(var(--border))] flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-[rgb(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold text-sm">TC</div>
            <div>
              <div className="font-bold text-[rgb(var(--text))]">THE Connect</div>
              <div className="text-xs text-[rgb(var(--muted))]">v.1</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-[rgb(var(--primary))] text-white" : "text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]"}`}>
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <>
              <div className="pt-4 pb-2 px-3 text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider">Admin</div>
              {adminItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-[rgb(var(--primary))] text-white" : "text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))]"}`}>
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-[rgb(var(--border))] space-y-3">
          <button onClick={toggleTheme} className="w-full flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] px-2 py-1.5 rounded transition-colors">
            {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
          <div className="flex items-center gap-3">
            {user.photo ? (
              <img src={user.photo} alt="" className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center text-sm font-semibold">
                {user.full_name?.charAt(0) || "A"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.full_name}</div>
              <div className="text-xs text-[rgb(var(--muted))] capitalize">{user.role}</div>
            </div>
          </div>
          <button onClick={logout} className="w-full text-left text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--danger))] px-2 py-1.5 rounded transition-colors">
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-14 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))] flex items-center px-4 lg:px-6 gap-4">
          <button className="lg:hidden p-2 rounded-md hover:bg-[rgb(var(--bg))]" onClick={() => setSidebarOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="text-xs text-[rgb(var(--muted))]">Created by Aiden Armstrong</div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
