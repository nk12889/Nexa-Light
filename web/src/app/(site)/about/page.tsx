import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSeo, getSettings } from "@/lib/data";
import { media } from "@/lib/site";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("about");
  return {
    title: seo.title || "About NexaLight Studio | Precision Optoelectronic Engineering",
    description:
      seo.description ||
      "Engineered at the intersection of optical science and architectural intent. Discover the story, manufacturing laboratory, and design philosophy behind NexaLight.",
    alternates: { canonical: "/about" },
  };
}

const VALUES = [
  {
    title: "Innovation First",
    text: "Constantly pushing the boundaries of what's possible with LED technology and optical control.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Architecture-Led",
    text: "Our products are designed to complement and enhance architecture, never to compete with it.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Sustainability",
    text: "Committed to long-lasting build quality that reduces waste and energy consumption.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

const PROJECTS = [
  { img: "images/project_1.png", kind: "Hospitality", title: "Aria Grande Facade", place: "Mumbai, India" },
  { img: "images/project_2.png", kind: "Resorts", title: "The Azure Waters", place: "Goa, India" },
  { img: "images/project_3.png", kind: "Infrastructure", title: "Celestial Bridge", place: "Dubai, UAE" },
];

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      <section className="h-[80svh] w-full relative flex items-center justify-center px-6 md:px-12 overflow-hidden bg-primary">
        <Image src={media("images/about_hero.png")} alt="" fill priority sizes="100vw" className="object-cover z-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-[1]" />
        <div className="max-w-[100rem] mx-auto w-full relative z-10">
          <p className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-8">Architectural Excellence</p>
          <h1 className="text-5xl md:text-[9rem] font-medium tracking-tighter text-white leading-[1.0]">
            <span className="block clip-text pb-2 md:pb-4"><span>Crafting the</span></span>
            <span className="block clip-text pb-3 md:pb-6 italic font-light text-white/90"><span style={{ animationDelay: "80ms" }}>Future of Light.</span></span>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 md:px-12 bg-white relative z-10 overflow-hidden">
        <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
          <div className="lg:col-span-6 anim-fade-up">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">Who We Are</h2>
            <h3 className="text-4xl md:text-7xl font-medium text-primary tracking-tighter leading-[0.9] mb-10">
              Pioneering <br /><span className="italic font-light text-secondary">Optical Precision.</span>
            </h3>
            <p className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-12">
              Based in Ganaur, Haryana, NexaLight is not just a manufacturer; we are a dedicated studio of light enthusiasts. Our facility combines state-of-the-art global optical standards with the finesse of Indian engineering, creating instruments that are as durable as they are beautiful.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              {[
                ["12+", "Years of Innovation"],
                ["500+", "Landmark Projects"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col border-l-2 border-accent pl-6">
                  <span className="text-3xl sm:text-4xl font-medium text-primary tracking-tighter">{v}</span>
                  <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-2">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 anim-fade-up" style={{ transitionDelay: "200ms" }}>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium-dark border border-black/5 relative bg-skeleton">
                <Image src={media("images/about_company.png")} alt="NexaLight studio" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
              </div>
              <div className="absolute -bottom-8 left-4 sm:-left-8 bg-white p-8 rounded-3xl shadow-2xl border border-black/5 max-w-[280px]">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Our Studio</p>
                <p className="text-sm text-primary font-medium leading-relaxed">A sanctuary of precision where science meets architectural art.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-12 bg-surfaceLight relative z-10 overflow-hidden border-y border-black/5">
        <div className="bg-grid-premium absolute inset-0 opacity-40" />
        <div className="max-w-[100rem] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 anim-fade-up">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">Our Mission</h2>
            <h3 className="text-4xl md:text-7xl font-medium tracking-tighter text-primary leading-none">
              To disappear, leaving only <span className="italic font-light">the magic of light.</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-white/50 backdrop-blur-xl p-12 rounded-[2.5rem] border border-black/5 anim-fade-up" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-xl">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h4 className="text-2xl font-medium text-primary mb-4">{v.title}</h4>
                <p className="text-sm text-secondary font-light leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 md:px-12 bg-white relative z-10 overflow-hidden">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 anim-fade-up">
            <div className="max-w-2xl">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">Our Projects</h2>
              <h3 className="text-4xl md:text-8xl font-medium tracking-tighter text-primary leading-none">Defining <span className="italic font-light">Skylines.</span></h3>
            </div>
            <p className="text-lg text-secondary font-light max-w-sm mt-8 md:mt-0 leading-relaxed">A testament to our precision engineering across the world&apos;s most demanding environments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-premium hover:shadow-premium-dark transition-all duration-700 anim-fade-up bg-skeleton" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                <Image src={media(p.img)} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-10 z-10">
                  <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">{p.kind}</p>
                  <h4 className="text-white text-3xl font-medium mb-1">{p.title}</h4>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mt-4">{p.place}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 md:mt-32 text-center anim-fade-up">
            <Link href="/products" className="btn-premium px-12 py-6 rounded-full text-xs font-bold tracking-widest uppercase shadow-2xl">Explore Full Portfolio</Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-60 text-center bg-background relative overflow-hidden border-t border-black/5">
        <div className="max-w-4xl mx-auto anim-fade-up relative z-10 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-10">Join Our Network</h2>
          <h3 className="text-5xl md:text-[8rem] font-medium tracking-tighter mb-16 leading-[0.9] text-primary">Let&apos;s create<br />something iconic.</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link href="/contact" className="btn-premium px-12 py-6 rounded-full text-xs font-bold tracking-widest uppercase shadow-2xl">Start a Specification</Link>
            <a href={`mailto:${settings.email}`} className="text-sm font-bold text-primary hover:text-accent transition-colors border-b-2 border-primary/10 pb-2">Email our Studio</a>
          </div>
        </div>
      </section>
    </div>
  );
}
