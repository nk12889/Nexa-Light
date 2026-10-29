import Image from "next/image";
import Link from "next/link";
import type { BlogArticle, Product } from "@/lib/data";
import { media } from "@/lib/site";

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <Link href={`/product/${p.id}`} className="block group anim-fade-up" style={{ transitionDelay: `${Math.min(index, 8) * 50}ms` }}>
      <div className="aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-5 shadow-premium transition-all duration-700 group-hover:shadow-premium-dark group-hover:-translate-y-2 relative border border-black/[0.03] bg-skeleton">
        <Image
          src={media(p.heroImg)}
          alt={p.name}
          fill
          sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-5 left-5">
          <span className="bg-white/95 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-primary shadow-sm border border-black/5">
            {p.subcategory || p.category}
          </span>
        </div>
      </div>
      <div className="px-1">
        <h2 className="text-lg md:text-xl font-medium tracking-tight mb-1 text-primary group-hover:text-accent transition-colors">{p.name}</h2>
        <div className="flex justify-between items-center text-[10px] mt-3 pt-3 border-t border-black/5">
          <p className="text-secondary font-medium uppercase tracking-widest">{p.price || "Inquire"}</p>
          <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-semibold uppercase tracking-widest">Details →</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ art, index = 0, rounded = "rounded-[2rem]" }: { art: BlogArticle; index?: number; rounded?: string }) {
  return (
    <Link
      href={`/blog/${art.slug}`}
      className={`group bg-white ${rounded} overflow-hidden shadow-premium hover:shadow-premium-dark transition-all duration-700 border border-black/5 flex flex-col anim-fade-up`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-skeleton">
        <Image src={media(art.image)} alt={art.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">{art.category}</span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          {(art.date || art.readTime) && (
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">
              {art.date && <span>{art.date}</span>}
              {art.date && art.readTime && <span>•</span>}
              {art.readTime && <span>{art.readTime}</span>}
            </div>
          )}
          <h3 className="text-xl font-medium tracking-tight text-primary mb-3 leading-snug group-hover:text-accent transition-colors">{art.title}</h3>
          {art.excerpt && <p className="text-xs text-secondary leading-relaxed line-clamp-3 font-light mb-6">{art.excerpt}</p>}
        </div>
        <div className="flex items-center justify-between pt-5 border-t border-black/5">
          <div className="flex items-center gap-2.5">
            {art.authorAvatar && (
              <Image src={media(art.authorAvatar)} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover border border-black/10" />
            )}
            <span className="text-xs font-semibold text-primary">{art.author || "NexaLight Studio"}</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-1 transition-transform">Read →</span>
        </div>
      </div>
    </Link>
  );
}
