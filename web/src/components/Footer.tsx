import Link from "next/link";
import Image from "next/image";
import { media } from "@/lib/site";
import { Instagram, LinkedIn } from "./icons";

const COLUMNS = [
  {
    title: "Products",
    links: [
      { href: "/products/facade-lighting", label: "Facade Lighting" },
      { href: "/products/fiber-optic-lighting", label: "Fiber Optic Lighting" },
      { href: "/products/landscape-lighting", label: "Landscape Lighting" },
      { href: "/products/indoor-architectural-lighting", label: "Indoor Architectural" },
      { href: "/gallery", label: "Project Gallery" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/catalogue", label: "Download Catalogue", external: true },
      { href: "/contact", label: "IES Files" },
      { href: "/contact", label: "Revit Models" },
      { href: "/contact", label: "Engineering Lab" },
      { href: "/contact", label: "Warranty" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/blog", label: "Studio Journal / Blog" },
      { href: "/about", label: "Our Story" },
      { href: "/about", label: "Careers" },
      { href: "/contact", label: "Locate Us" },
    ],
  },
];

export default function Footer({ email }: { email: string }) {
  return (
    <footer className="bg-primary text-white py-24 md:py-40 relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
          <div className="lg:col-span-4">
            <Image
              src={media("images/logo.png")}
              alt="NexaLight Logo"
              width={200}
              height={48}
              unoptimized
              className="h-10 md:h-12 w-auto object-contain mb-10 brightness-0 invert"
            />
            <p className="text-white/60 max-w-sm text-lg leading-relaxed mb-12 font-light">
              Engineered at the intersection of optical science and architectural intent. We sculpt the night through
              precision light instruments.
            </p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/company/nexalight" target="_blank" rel="noopener" aria-label="LinkedIn" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500">
                <LinkedIn />
              </a>
              <a href="https://www.instagram.com/nexalight" target="_blank" rel="noopener" aria-label="Instagram" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500">
                <Instagram />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-accent">{col.title}</h4>
                <ul className="space-y-4 text-sm font-medium">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l ? (
                        <a href={l.href} target="_blank" className="text-white/50 hover:text-white transition-colors">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="text-white/50 hover:text-white transition-colors">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-accent">Inquiries</h4>
              <p className="text-xs text-white/40 mb-6 leading-relaxed">Direct communication for masterplan project specifications.</p>
              <a href={`mailto:${email}`} className="text-sm font-medium text-white border-b border-white/20 pb-1 hover:border-white transition-all break-all">
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <p>&copy; {new Date().getFullYear()} NexaLight Architectural Lighting.</p>
          </div>
          <div className="flex items-center gap-8 opacity-20">
            {["IP68", "RoHS", "CE", "IK10"].map((b) => (
              <span key={b} className="text-[10px] font-black tracking-widest uppercase italic">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
