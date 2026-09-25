"use client";
import AppShell from "@/components/AppShell";
import { getUser, saveUser } from "@/lib/storage";
import { useEffect, useState, useRef } from "react";
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const u = getUser();
    if (u) { setUser(u); setBio(u.bio || ""); setPhone(u.phone || ""); setPhoto(u.photo || null); }
  }, []);
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };
  const save = () => {
    const updated = { ...user, bio, phone, photo };
    saveUser(updated);
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  if (!user) return null;
  return (
    <AppShell>
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-bold">Your Profile</h1>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              {photo ? <img src={photo} alt="" className="w-20 h-20 rounded-2xl object-cover" /> : (
                <div className="w-20 h-20 rounded-2xl bg-[rgb(var(--primary))] text-white flex items-center justify-center text-3xl font-bold">{user.full_name?.charAt(0)}</div>
              )}
              <button type="button" onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center shadow text-xs">📷</button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </div>
            <div>
              <div className="font-bold text-lg">{user.full_name}</div>
              <div className="text-sm text-[rgb(var(--muted))]"">{user.email}</div>
              <div className="text-xs capitalize mt-1 px-2 py-0.5 rounded-full bg-[rgb(var(--bg))] inline-block">{user.role}</div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full mt-1 p-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 h-11 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          </div>
          <button onClick={save} className="w-full h-11 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium">{saved ? "Saved ✓" : "Save changes"}</button>
        </div>
      </div>
    </AppShell>
  );
}
