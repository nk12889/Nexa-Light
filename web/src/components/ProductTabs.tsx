"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductTabs({ desc, features, specs }: { desc?: string; features?: string[]; specs?: Record<string, string> }) {
  const [tab, setTab] = useState<"overview" | "specs">("overview");
  const specEntries = Object.entries(specs ?? {});
  const tabClass = (t: string) =>
    `pb-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${tab === t ? "border-accent text-primary" : "border-transparent text-secondary hover:text-primary"}`;

  return (
    <>
      <div className="flex gap-8 border-b border-black/10 mb-8 mt-4" role="tablist">
        <button role="tab" aria-selected={tab === "overview"} onClick={() => setTab("overview")} className={tabClass("overview")}>Overview</button>
        {specEntries.length > 0 && (
          <button role="tab" aria-selected={tab === "specs"} onClick={() => setTab("specs")} className={tabClass("specs")}>Tech Specs</button>
        )}
      </div>

      {tab === "overview" ? (
        <div className="mb-10 flex-grow">
          {desc && <p className="text-lg md:text-xl text-secondary font-light leading-relaxed whitespace-pre-line">{desc}</p>}
          {features && features.length > 0 && (
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex gap-3 text-secondary text-sm font-light">
                  <span className="text-accent">—</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mb-10 flex-grow">
          <div className="bg-surfaceLight/50 rounded-[1.5rem] p-6 border border-black/5">
            <div className="flex justify-between items-end mb-6">
              <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent/20 pb-1 hover:border-accent transition-all">Download IES</Link>
            </div>
            <table className="w-full">
              <tbody>
                {specEntries.map(([k, v]) => (
                  <tr key={k} className="border-b border-black/5 last:border-0">
                    <td className="py-2 text-secondary text-sm font-medium pr-4 w-1/3 align-top">{k}</td>
                    <td className="py-2 text-primary text-sm font-light">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
