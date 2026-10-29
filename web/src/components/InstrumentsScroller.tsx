"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

// Horizontal product strip with arrow buttons (native scrolling + snap).
export default function InstrumentsScroller({ children, header }: { children: React.ReactNode; header: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: (window.innerWidth > 768 ? 450 : window.innerWidth * 0.85) * dir, behavior: "smooth" });
  };

  return (
    <>
      <div className="max-w-[100rem] mx-auto pt-16 md:pt-24 px-6 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 anim-fade-up">
          {header}
          <div className="flex items-center mt-6 md:mt-0 gap-6">
            <div className="hidden md:flex gap-2 mr-6">
              <button onClick={() => scroll(-1)} aria-label="Scroll left" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary hover:scale-105">
                <ChevronLeft />
              </button>
              <button onClick={() => scroll(1)} aria-label="Scroll right" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary hover:scale-105">
                <ChevronRight />
              </button>
            </div>
            <Link href="/products" className="text-xs md:text-sm font-medium uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
              View Collection
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[100rem] mx-auto pl-6 md:pl-0 relative">
        <div ref={ref} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-8 md:pb-12 hide-scrollbar pr-6 md:pr-0">
          {children}
        </div>
      </div>
    </>
  );
}
