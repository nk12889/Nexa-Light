import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared hosting limits processes: build with a single worker.
  experimental: { cpus: 1 },
  images: {
    // WebP only: AVIF encoding is slow on shared hosting CPUs.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2678400,
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
