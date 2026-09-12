import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Bypass optimizer so remote photos always show (avoids local cache/disk failures)
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
