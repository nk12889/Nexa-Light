"use client";

import { useMemo, useState } from "react";
import type { BlogArticle } from "@/lib/data";
import { BlogCard } from "./cards";

// Category filter chips over the article grid (the featured essay sits above).
export default function BlogBrowser({ articles }: { articles: BlogArticle[] }) {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const shown = category === "All" ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <section className="py-6 px-6 md:px-12 sticky top-[72px] md:top-[80px] z-30 border-b border-black/5 bg-background/95">
        <div className="max-w-[100rem] mx-auto flex flex-wrap items-center gap-2 md:gap-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${c === category ? "bg-primary text-white shadow-md" : "bg-white text-secondary hover:bg-surface border border-black/5"}`}
            >
              {c === "All" ? "All Articles" : c}
            </button>
          ))}
        </div>
      </section>
      <section className="py-16 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shown.map((art, i) => (
            <BlogCard key={art.slug} art={art} index={i % 3} />
          ))}
        </div>
      </section>
    </>
  );
}
