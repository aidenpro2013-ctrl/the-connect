"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";

type LinkItem = { id: number; title: string; url: string; category: string; visibility: "public" | "private" };
const CATS = ["Social Media", "Music", "Business", "Creative", "Tech", "Other"];

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Other");
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  useEffect(() => {
    const raw = localStorage.getItem("the_connect_links");
    if (raw) setLinks(JSON.parse(raw));
  }, []);

  const persist = (next: LinkItem[]) => {
    setLinks(next);
    localStorage.setItem("the_connect_links", JSON.stringify(next));
  };

  const add = () => {
    if (!title || !url) return;
    persist([{ id: Date.now(), title, url: url.startsWith("http") ? url : `https://${url}`, category, visibility }, ...links]);
    setTitle("");
    setUrl("");
  };

  const remove = (id: number) => persist(links.filter((l) => l.id !== id));
  const filtered = filter === "All" ? links : links.filter((l) => l.category === filter);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-bold">Link Hub</h1>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-sm">Add a link</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className="w-full h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          <div className="flex gap-2 flex-wrap">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm">{CATS.map((c) => (<option key={c} value={c}>{c}</option>))}</select>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as "public" | "private")} className="h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm"><option value="public">Public</option><option value="private">Private</option></select>
            <button onClick={add} className="h-10 px-5 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium">Add</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...CATS].map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`text-xs px-3 py-1.5 rounded-full border transition ${filter === c ? "bg-[rgb(var(--primary))] text-white border-transparent" : "border-[rgb(var(--border))]"}`}>{c}</button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-[rgb(var(--muted))] py-8">No links yet. Add one above!</div>
          ) : (
            filtered.map((l) => (
              <div key={l.id} className="flex items-center gap-3 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-3">
                <div className="flex-1 min-w-0">
                  <a href={l.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-[rgb(var(--primary))] hover:underline truncate block">{l.title}</a>
                  <div className="text-xs text-[rgb(var(--muted))]">{l.category} · {l.visibility}</div>
                </div>
                <button onClick={() => remove(l.id)} className="text-xs text-[rgb(var(--muted))] hover:text-red-500">Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
