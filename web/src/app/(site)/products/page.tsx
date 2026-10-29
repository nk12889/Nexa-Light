import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductBrowser, ProductBrowserFromUrl } from "@/components/ProductBrowser";
import { getCategories, getProducts, getSeo } from "@/lib/data";

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
      <section className="pt-32 md:pt-40 pb-24 md:pb-48 px-6 md:px-12 relative z-10">
        <h1 className="sr-only">NexaLight Architectural Lighting Products</h1>
        {/* The full list is pre-rendered; the URL's ?cat= filter applies once the page loads. */}
        <Suspense fallback={<ProductBrowser products={products} categories={categories} />}>
          <ProductBrowserFromUrl products={products} categories={categories} />
        </Suspense>
      </section>
    </div>
  );
}
