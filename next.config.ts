import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source art is ~2MB PNG per file. AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // /house was the single-house page before the network existed.
    return [{ source: "/house", destination: "/houses", permanent: true }];
  },
};

export default nextConfig;
