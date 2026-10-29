import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A staging copy (anything but the real domain) asks search engines to stay away.
  if (process.env.NEXT_PUBLIC_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/catalogue"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
