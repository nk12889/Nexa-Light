"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { GalleryProject } from "@/lib/data";
import { media } from "@/lib/site";

type Props = {
  projects: GalleryProject[];
  showFilters?: boolean;
  limit?: number;
  rounded?: string;
};

export default function GalleryGrid({ projects, showFilters = false, limit, rounded = "rounded-[2rem]" }: Props) {
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean) as string[]))],
    [projects]
  );
  const shown = (category === "All" ? projects : projects.filter((p) => p.category === category)).slice(0, limit);
  const open = projects.find((p) => p.id === openId);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {showFilters && (
        <section className="py-6 px-6 md:px-12 sticky top-[72px] md:top-[80px] z-30 border-b border-black/5 backdrop-blur-xl bg-background/80">
          <div className="max-w-[100rem] mx-auto flex flex-wrap items-center gap-2 md:gap-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                  c === category ? "bg-primary text-white shadow-md" : "bg-white text-secondary hover:bg-surface border border-black/5"
                }`}
              >
                {c === "All" ? "All Projects" : c}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className={showFilters ? "py-16 md:py-24 px-6 md:px-12" : ""}>
        <div className={`max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 ${limit === 3 ? "md:grid-cols-3" : "lg:grid-cols-3"} gap-8`}>
          {shown.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => setOpenId(proj.id)}
              className={`text-left group relative ${rounded} overflow-hidden bg-white shadow-premium hover:shadow-premium-dark transition-all duration-700 border border-black/5 anim-fade-up`}
              style={{ transitionDelay: `${(i % 6) * 50}ms` }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-skeleton">
                <Image src={media(proj.image)} alt={proj.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                {proj.category && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">{proj.category}</span>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent block mb-1">
                    {[proj.location, proj.year].filter(Boolean).join(" • ")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">{proj.title}</h3>
                  {proj.desc && <p className="text-xs text-white/70 line-clamp-2 font-light">{proj.desc}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpenId(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2rem] overflow-hidden max-w-6xl w-full shadow-premium-dark border border-black/5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="lg:col-span-7 bg-black/95 relative min-h-[350px] lg:min-h-[550px]">
              <Image src={media(open.image)} alt={open.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              {open.category && (
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white">{open.category}</span>
                </div>
              )}
            </div>
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">{[open.location, open.year].filter(Boolean).join(" • ")}</span>
                  <button onClick={() => setOpenId(null)} aria-label="Close" className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-black/10 transition-colors">✕</button>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-primary mb-4 leading-tight">{open.title}</h2>
                {open.desc && <p className="text-secondary text-sm leading-relaxed mb-6 font-light">{open.desc}</p>}
                {(open.product || open.specs) && (
                  <div className="p-5 rounded-2xl bg-surfaceLight border border-black/5 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">Instrument Specified</span>
                    {open.product && <span className="text-sm font-semibold text-primary block mb-1">{open.product}</span>}
                    {open.specs && <span className="text-xs text-secondary font-mono">{open.specs}</span>}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 pt-6 border-t border-black/5">
                <Link href={`/contact?project=${encodeURIComponent(open.title)}`} className="w-full py-4 rounded-full bg-primary text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all">
                  Specify Similar Lighting Look
                </Link>
                <button onClick={() => setOpenId(null)} className="w-full py-3 rounded-full bg-surface text-secondary text-center text-xs font-semibold uppercase tracking-widest hover:bg-black/5 transition-all">
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
