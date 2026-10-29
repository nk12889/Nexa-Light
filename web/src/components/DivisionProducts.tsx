"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import { ProductCard } from "./cards";

type CardProduct = Pick<Product, "id" | "name" | "category" | "subcategory" | "price" | "heroImg">;

// Product grid for one division with subcategory filter chips.
export default function DivisionProducts({ products }: { products: CardProduct[] }) {
  const [sub, setSub] = useState("All");
  const subs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) if (p.subcategory) counts.set(p.subcategory, (counts.get(p.subcategory) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [products]);
  const shown = sub === "All" ? products : products.filter((p) => p.subcategory === sub);

  return (
    <>
      {subs.length > 1 && (
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {[["All", products.length] as [string, number], ...subs].map(([name, count]) => (
            <button
              key={name}
              onClick={() => setSub(name)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
                name === sub ? "bg-primary text-white" : "bg-white text-secondary border border-black/10 hover:border-primary hover:text-primary"
              }`}
            >
              {name === "All" ? "All" : name} <span className={name === sub ? "text-white/60" : "text-secondary/60"}>· {count}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
        {shown.map((p, i) => (
          <ProductCard key={p.id} p={p as Product} index={i} />
        ))}
      </div>
    </>
  );
}
