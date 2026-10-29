import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductBrowser, ProductBrowserFromUrl } from "@/components/ProductBrowser";
import Link from "next/link";
import { getCategories, getProducts, getSeo } from "@/lib/data";
import { DIVISIONS } from "@/lib/divisions";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("products");
  return {
    title: seo.title || "Architectural Lighting Instruments & Products | NexaLight Collection",
    description:
      seo.description ||
      "Browse IP68 submersible projectors, DMX facade RGBW linear profiles, trimless pinhole downlights, and museum track systems with downloadable IES & Revit files.",
    alternates: { canonical: "/products" },
  };
}

export default async function ProductsPage() {
  const [all, categories] = await Promise.all([getProducts(), getCategories()]);
  // Only what the cards need goes to the browser (no descriptions/specs).
  const products = all.map(({ id, name, category, subcategory, price, heroImg }) => ({ id, name, category, subcategory, price, heroImg }));

  return (
    <div className="relative bg-background overflow-hidden bg-grid-premium min-h-screen">
      <div className="floating-blob top-[-10%] right-[-10%]" />
      <div className="floating-blob bottom-[-10%] left-[-10%]" style={{ animationDelay: "-5s", background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)" }} />
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-[100rem] mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5">Product Collection</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-12">
            <h1 className="lg:col-span-7 text-5xl md:text-7xl font-medium tracking-tighter text-primary leading-[0.95]">Architectural<br />lighting products.</h1>
            <p className="lg:col-span-5 text-secondary font-light text-lg leading-relaxed">
              {all.length} products across four divisions. Choose a division, or search and filter the complete range below.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {DIVISIONS.map((d) => (
              <Link key={d.slug} href={`/products/${d.slug}`} className="group p-5 md:p-6 rounded-2xl bg-white/80 border border-black/5 hover:border-primary transition-colors">
                <span className="block text-[11px] font-bold text-accent mb-3">{d.number}</span>
                <span className="block text-base md:text-lg font-medium text-primary leading-snug">{d.category}</span>
                <span className="flex items-center justify-between mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                  {all.filter((p) => p.category === d.category).length} products
                  <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24 md:pb-48 px-6 md:px-12 relative z-10 border-t border-black/5 pt-12 md:pt-16">
        {/* The full list is pre-rendered; the URL's ?cat= filter applies once the page loads. */}
        <Suspense fallback={<ProductBrowser products={products} categories={categories} />}>
          <ProductBrowserFromUrl products={products} categories={categories} />
        </Suspense>
      </section>
    </div>
  );
}
