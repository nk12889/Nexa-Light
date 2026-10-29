import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "nexalight.in" },
      { protocol: "https", hostname: "www.nexalight.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "rgqcfplwuxmdpvnioapg.supabase.co" },
    ],
  },
  async rewrites() {
    // The admin panel is the existing static app in public/admin.
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
