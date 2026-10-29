import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductMedia from "@/components/ProductMedia";
import ProductTabs from "@/components/ProductTabs";
import { ArrowLeft } from "@/components/icons";
import { getProduct, getProducts } from "@/lib/data";
import { SITE_URL, media } from "@/lib/site";
import { divisionHref } from "@/lib/divisions";

export const revalidate = 60;

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getProduct((await params).id);
  if (!p) return { title: "Product not found | NexaLight" };
  const title = p.seoTitle || `${p.name} - ${p.category} | NexaLight Specification`;
  const description =
    p.seoDesc || `${p.name} architectural lighting instrument: ${(p.desc || "Precision optoelectronic instrument").slice(0, 150)}… Download IES & Revit specifications.`;
  return {
    title,
    description,
    alternates: { canonical: `/product/${p.id}` },
    openGraph: { title, description, images: [media(p.heroImg)], type: "website" },
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const all = await getProducts();
  const related = all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = Array.from(new Set([product.heroImg, ...(product.gallery ?? [])].filter(Boolean) as string[])).map(media);
  if (images.length === 0) images.push(media(null));

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: images,
    description: product.desc || "Precision architectural lighting instrument by NexaLight.",
    brand: { "@type": "Brand", name: "NexaLight" },
    category: product.category,
    url: `${SITE_URL}/product/${product.id}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-12 bg-background relative min-h-screen">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <ProductMedia images={images} name={product.name} />
            </div>

            <div className="lg:col-span-7 flex flex-col h-full">
              <div className="mb-8">
                <span className="text-accent font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4 block">{product.subcategory || product.category}</span>
                <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-primary leading-[1.1] mb-6">
                  <span className="block clip-text pb-2"><span>{product.name}.</span></span>
                </h1>
                <div className="flex items-center gap-6 md:gap-12 py-6 border-y border-black/5 mb-8">
                  <div className="flex flex-col">
                    <span className="text-secondary text-[10px] uppercase tracking-widest font-bold mb-1">Status</span>
                    <span className="text-primary text-sm font-medium">Available for Specification</span>
                  </div>
                  <div className="w-px h-10 bg-black/10" />
                  <div className="flex flex-col">
                    <span className="text-secondary text-[10px] uppercase tracking-widest font-bold mb-1">Price Tier</span>
                    <span className="text-primary text-sm font-medium">{product.price || "Premium Tier"}</span>
                  </div>
                </div>
                <ProductTabs desc={product.desc} features={product.features} specs={product.specs} />
              </div>

              <div className="mt-auto">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="btn-premium w-full py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-xl text-center"
                >
                  Inquire &amp; Specify
                </Link>
                <p className="text-[10px] text-center text-secondary uppercase tracking-widest font-semibold mt-6">Lead Time: 4-6 Weeks for Custom Batches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-10 left-6 md:left-10 z-50">
        <Link href="/products" className="bg-white/95 border border-black/10 px-6 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-2xl hover:bg-primary hover:text-white transition-all flex items-center gap-3 group">
          <ArrowLeft />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Back to Collection</span>
          <span className="sr-only">Back to collection</span>
        </Link>
      </div>

      {related.length > 0 && (
        <section className="pt-12 pb-24 md:pt-20 md:pb-48 px-6 md:px-12 bg-white relative overflow-hidden">
          <div className="max-w-[100rem] mx-auto">
            <div className="flex justify-between items-end mb-16 anim-fade-up gap-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">Related</h2>
                <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-primary">Similar Instruments.</h3>
              </div>
              <Link href={divisionHref(product.category)} className="text-sm font-medium uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors shrink-0">
                View Category
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block anim-fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-premium mb-6 relative bg-skeleton">
                    <Image src={media(p.heroImg)} alt={p.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h4 className="text-xl font-medium text-primary group-hover:text-accent transition-colors mb-1">{p.name}</h4>
                  <p className="text-secondary text-xs uppercase tracking-widest font-semibold">{p.subcategory}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
