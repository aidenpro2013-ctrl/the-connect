"use client";
import AppShell from "@/components/AppShell";
export default function AboutPage() {
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">About THE Connect</h1>
          <p className="text-[rgb(var(--muted))] mt-2">A community platform for Seabrook / CCISD</p>
        </div>
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[rgb(var(--primary))] text-white flex items-center justify-center text-2xl font-bold shrink-0">A</div>
            <div>
              <h2 className="text-xl font-bold">Aiden Armstrong</h2>
              <p className="text-sm text-[rgb(var(--muted))]">Creator & Owner</p>
              <p className="mt-2 text-sm leading-relaxed">Hi my name is Aiden and im a big coder hope you enjoy my app.</p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">Favorite colors: pastel yellow & dark green · 4 pets · Loves painting, sketching, stickers, rocks, pins & astrology.</p>
            </div>
          </div>
          <div className="border-t border-[rgb(var(--border))] pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-200 text-pink-700 flex items-center justify-center text-xl font-bold shrink-0">E</div>
              <div>
                <h3 className="font-semibold">Elizabeth</h3>
                <p className="text-sm text-[rgb(var(--muted))] mt-1">Featured community member.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
