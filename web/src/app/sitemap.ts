import type { MetadataRoute } from "next";
import { getBlogArticles, getCategories, getProducts } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, articles] = await Promise.all([getProducts(), getCategories(), getBlogArticles()]);
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "daily"),
    page("/products", 0.9),
    ...Object.keys(categories).map((c) => page(`/products?cat=${encodeURIComponent(c)}`, 0.8)),
    ...products.map((p) => page(`/product/${p.id}`, 0.8)),
    page("/gallery", 0.8),
    page("/blog", 0.8),
    ...articles.map((a) => page(`/blog/${a.slug}`, 0.6, "monthly")),
    page("/about", 0.7, "monthly"),
    page("/contact", 0.8, "monthly"),
  ];
}
