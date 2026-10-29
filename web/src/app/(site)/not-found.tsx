import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 bg-background bg-grid-premium text-center">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6">404</p>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-primary mb-8">Lost in the dark.</h1>
        <p className="text-secondary font-light mb-10">This page doesn&apos;t exist or has moved.</p>
        <Link href="/products" className="btn-premium px-10 py-5 rounded-full text-xs font-bold tracking-widest uppercase">Browse Products</Link>
      </div>
    </section>
  );
}
