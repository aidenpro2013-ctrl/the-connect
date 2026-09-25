"use client";
import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";
type UserRow = { id: string; name: string; email: string; role: string; flagged: boolean };
const INITIAL: UserRow[] = [
  { id: "1", name: "Aiden Armstrong", email: "aidenpro2013@gmail.com", role: "owner", flagged: false },
  { id: "2", name: "Elizabeth", email: "elizabeth@example.com", role: "user", flagged: false },
  { id: "3", name: "Jordan Lee", email: "jordan@example.com", role: "team_member", flagged: false },
  { id: "4", name: "Sam Rivera", email: "sam@example.com", role: "user", flagged: true },
];
export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("the_connect_admin_users");
    if (raw) setUsers(JSON.parse(raw));
    else { setUsers(INITIAL); localStorage.setItem("the_connect_admin_users", JSON.stringify(INITIAL)); }
  }, []);
  const persist = (next: UserRow[]) => { setUsers(next); localStorage.setItem("the_connect_admin_users", JSON.stringify(next)); };
  const setRole = (id: string, role: string) => persist(users.map((u) => (u.id === id ? { ...u, role } : u)));
  const toggleFlag = (id: string) => persist(users.map((u) => (u.id === id ? { ...u, flagged: !u.flagged } : u)));
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Manage Users</h1>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center gap-3 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center font-semibold">{u.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{u.name} {u.flagged && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 ml-1">Flagged</span>}</div>
                <div className="text-xs text-[rgb(var(--muted))]"">{u.email}</div>
              </div>
              <select value={u.role} onChange={(e) => setRole(u.id, e.target.value)} disabled={u.role === "owner"} className="h-9 px-2 rounded-lg border border-[rgb(var(--border))] bg-transparent text-xs">
                <option value="user">User</option><option value="team_member">Team Member</option><option value="admin">Admin</option><option value="owner">Owner</option>
              </select>
              <button onClick={() => toggleFlag(u.id)} className="h-9 px-3 rounded-lg text-xs border border-[rgb(var(--border))]">{u.flagged ? "Unflag" : "Flag"}</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
