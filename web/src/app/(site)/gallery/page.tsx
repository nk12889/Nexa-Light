import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery, getSeo } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("gallery");
  return {
    title: seo.title || "Project Gallery & Installations | NexaLight Architectural Portfolio",
    description:
      seo.description ||
      "Explore landmark lighting installations, skyscraper facade projects, fiber optic star pools, and luxury interior lighting specified with NexaLight instruments.",
    alternates: { canonical: "/gallery" },
  };
}

export default async function GalleryPage() {
  const projects = await getGallery();
  return (
    <div className="bg-background relative min-h-screen">
      <section className="pt-36 pb-20 px-6 md:px-12 bg-surfaceLight border-b border-black/5 relative overflow-hidden">
        <div className="max-w-[100rem] mx-auto anim-fade-up">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-4">Architectural Portfolio</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-primary leading-tight mb-6">
            Landmark Installations<br />&amp; Custom Lightscapes.
          </h1>
          <p className="text-secondary text-base md:text-xl font-light max-w-2xl leading-relaxed">
            Explore how NexaLight optical systems transform urban skylines, cultural landmarks, luxury resorts, and architectural interiors around the world.
          </p>
        </div>
      </section>

      <GalleryGrid projects={projects} showFilters />

      <section className="py-24 px-6 md:px-12 bg-surfaceLight border-t border-black/5 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-4">Collaborate With Our Studio</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Have an Architectural Project to Specify?</h2>
          <p className="text-secondary text-base md:text-lg font-light max-w-2xl mx-auto mb-10">
            We provide custom photometric simulation, cabling schematics, and sample mockups for architectural teams globally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-premium px-10 py-5 rounded-full text-xs font-bold tracking-widest uppercase">Start a Specification</Link>
            <a href="/catalogue" target="_blank" className="px-10 py-5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-primary border border-black/10 hover:border-primary transition-all shadow-md">
              Download Catalogue PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
