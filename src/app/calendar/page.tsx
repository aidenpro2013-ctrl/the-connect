"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";

type Event = { id: number; title: string; date: string; time?: string };

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  useEffect(() => {
    const raw = localStorage.getItem("the_connect_events");
    if (raw) setEvents(JSON.parse(raw));
  }, []);

  const persist = (next: Event[]) => {
    setEvents(next);
    localStorage.setItem("the_connect_events", JSON.stringify(next));
  };

  const add = () => {
    if (!title || !date) return;
    persist([...events, { id: Date.now(), title, date, time: time || undefined }]);
    setTitle("");
    setDate("");
    setTime("");
  };

  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const startDay = new Date(month.y, month.m, 1).getDay();
  const monthName = new Date(month.y, month.m).toLocaleString("default", { month: "long", year: "numeric" });

  const hasEvent = (day: number) => {
    const key = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.some((e) => e.date === key);
  };

  const dayEvents = events.filter((e) => {
    const [y, m] = e.date.split("-").map(Number);
    return y === month.y && m === month.m + 1;
  });

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl font-bold">Calendar</h1>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMonth((p) => (p.m === 0 ? { y: p.y - 1, m: 11 } : { y: p.y, m: p.m - 1 }))} className="px-3 py-1 rounded-lg hover:bg-[rgb(var(--bg))]">←</button>
            <div className="font-semibold">{monthName}</div>
            <button onClick={() => setMonth((p) => (p.m === 11 ? { y: p.y + 1, m: 0 } : { y: p.y, m: p.m + 1 }))} className="px-3 py-1 rounded-lg hover:bg-[rgb(var(--bg))]">→</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[rgb(var(--muted))] mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (<div key={d}>{d}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => (<div key={`e${i}`} />))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dot = hasEvent(day);
              return (
                <div key={day} className="aspect-square flex flex-col items-center justify-center rounded-lg text-sm hover:bg-[rgb(var(--bg))]">
                  {day}
                  {dot && <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))] mt-0.5" />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-sm">Add event</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" className="w-full h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          <div className="flex gap-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-32 h-10 px-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm outline-none" />
          </div>
          <button onClick={add} className="w-full h-10 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium">Add event</button>
        </div>
        {dayEvents.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-sm">Events this month</h2>
            {dayEvents.map((e) => (
              <div key={e.id} className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-lg px-4 py-3 text-sm flex justify-between">
                <span className="font-medium">{e.title}</span>
                <span className="text-[rgb(var(--muted))]">{e.date}{e.time ? ` · ${e.time}` : ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
