"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds .in-view to .anim-fade-up elements as they scroll into view, including
// ones rendered later (filters, client navigation).
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px" }
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll(".anim-fade-up:not(.in-view)").forEach((el) => io.observe(el));

    watch(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && watch(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
