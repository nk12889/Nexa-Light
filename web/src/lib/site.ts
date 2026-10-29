export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nexalight.in").replace(/\/$/, "");

// Uploaded product photos (/uploads/...) and brand images (/images/...) still
// live on the existing Hostinger site.
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || "https://nexalight.in").replace(/\/$/, "");

const PLACEHOLDER = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800";

export function media(src?: string | null): string {
  if (!src) return PLACEHOLDER;
  if (/^https?:\/\//.test(src)) return src;
  return `${MEDIA_BASE}/${src.replace(/^\/+/, "")}`;
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const PRODUCT_MENU = [
  { href: "/products", label: "All Products" },
  { href: "/products?cat=Facade%20Lighting", label: "Facade Lighting" },
  { href: "/products?cat=Fiber%20Optic%20Lighting", label: "Fiber Optic Lighting" },
  { href: "/products?cat=Landscape%20Lighting", label: "Landscape Lighting" },
  { href: "/products?cat=Indoor%20Architectural%20Lighting", label: "Indoor Architectural" },
];
