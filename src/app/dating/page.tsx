"use client";

import AppShell from "@/components/AppShell";
import {
  getUser,
  getDatingProfile,
  saveDatingProfile,
  getMatches,
  saveMatches,
} from "@/lib/storage";
import { useEffect, useState } from "react";

const DECK = [
  { id: "e1", name: "Elizabeth", age: 19, bio: "Love art, music, and good conversations.", interests: ["Art", "Music", "Astrology"] },
  { id: "j1", name: "Jordan", age: 21, bio: "CCISD grad. Always down for coffee or a hike.", interests: ["Hiking", "Coffee", "Photography"] },
  { id: "s1", name: "Sam", age: 20, bio: "Parakeet parent & sticker collector.", interests: ["Pets", "Stickers", "Painting"] },
  { id: "m1", name: "Morgan", age: 22, bio: "Music producer. Looking for someone to share playlists with.", interests: ["Music", "Tech", "Concerts"] },
];

export default function DatingPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [setup, setSetup] = useState({ name: "", age: "", bio: "", interests: "" });
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [tab, setTab] = useState<"swipe" | "matches">("swipe");

  useEffect(() => {
    const u = getUser();
    setUser(u);
    const p = getDatingProfile();
    setProfile(p);
    if (p) setSetup({ name: p.name || "", age: String(p.age || ""), bio: p.bio || "", interests: (p.interests || []).join(", ") });
    setMatches(getMatches());
  }, []);

  const createProfile = () => {
    if (!setup.name || !setup.age) { alert("Name and age are required"); return; }
    const p = { name: setup.name, age: Number(setup.age), bio: setup.bio, interests: setup.interests.split(",").map((s) => s.trim()).filter(Boolean), userId: user?.id };
    saveDatingProfile(p);
    setProfile(p);
  };

  const card = DECK[index % DECK.length];

  const swipe = (liked: boolean) => {
    if (liked && Math.random() > 0.35) {
      const m = { ...card, matchedAt: Date.now() };
      setMatched(m);
      const next = [...matches, m];
      setMatches(next);
      saveMatches(next);
      setTimeout(() => { setMatched(null); setIndex((i) => i + 1); }, 2200);
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (!user) return null;

  if (!profile) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Create Dating Profile</h1>
          <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Display name</label>
              <input value={setup.name} onChange={(e) => setSetup({ ...setup, name: e.target.value })} className="w-full mt-1 h-11 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <input type="number" value={setup.age} onChange={(e) => setSetup({ ...setup, age: e.target.value })} className="w-full mt-1 h-11 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" placeholder="18+" />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea value={setup.bio} onChange={(e) => setSetup({ ...setup, bio: e.target.value })} rows={3} className="w-full mt-1 p-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" placeholder="A little about you…" />
            </div>
            <div>
              <label className="text-sm font-medium">Interests (comma separated)</label>
              <input value={setup.interests} onChange={(e) => setSetup({ ...setup, interests: e.target.value })} className="w-full mt-1 h-11 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" placeholder="Art, Music, Hiking" />
            </div>
            <button onClick={createProfile} className="w-full h-11 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium">Start swiping</button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab("swipe")} className={`flex-1 h-10 rounded-lg text-sm font-medium ${tab === "swipe" ? "bg-[rgb(var(--primary))] text-white" : "bg-[rgb(var(--surface))] border border-[rgb(var(--border))]"}`}>Discover</button>
          <button onClick={() => setTab("matches")} className={`flex-1 h-10 rounded-lg text-sm font-medium ${tab === "matches" ? "bg-[rgb(var(--primary))] text-white" : "bg-[rgb(var(--surface))] border border-[rgb(var(--border))]"}`}>Matches ({matches.length})</button>
        </div>

        {tab === "matches" ? (
          <div className="space-y-2">
            {matches.length === 0 ? (
              <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-8 text-center text-[rgb(var(--muted))] text-sm">No matches yet. Keep swiping!</div>
            ) : (
              matches.map((m) => (
                <div key={m.id + m.matchedAt} className="flex items-center gap-3 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold">{m.name.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{m.name}, {m.age}</div>
                    <div className="text-xs text-[rgb(var(--muted))] line-clamp-1">{m.bio}</div>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-full bg-[rgb(var(--primary))] text-white">Message</button>
                </div>
              ))
            )}
          </div>
        ) : matched ? (
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-3xl p-10 text-center shadow-xl">
            <div className="text-5xl mb-4">💖</div>
            <h2 className="text-2xl font-bold">It&apos;s a Match!</h2>
            <p className="mt-2 opacity-90">You and {matched.name} liked each other</p>
          </div>
        ) : (
          <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-3xl overflow-hidden shadow-lg">
            <div className="h-72 bg-gradient-to-br from-[rgb(var(--primary))] to-indigo-600 flex items-center justify-center text-white text-6xl font-bold">{card.name.charAt(0)}</div>
            <div className="p-5">
              <h2 className="text-2xl font-bold">{card.name}, {card.age}</h2>
              <p className="text-[rgb(var(--muted))] mt-1 text-sm">{card.bio}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {card.interests.map((i: string) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))]">{i}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 pb-6">
              <button onClick={() => swipe(false)} className="w-16 h-16 rounded-full border-2 border-red-400 text-red-500 flex items-center justify-center text-2xl hover:bg-red-50 dark:hover:bg-red-950/30 transition">✕</button>
              <button onClick={() => swipe(true)} className="w-16 h-16 rounded-full border-2 border-emerald-400 text-emerald-500 flex items-center justify-center text-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition">♥</button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
