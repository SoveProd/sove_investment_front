import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Avoid 500s from Next image optimizer for CMS/CDN assets.
    // We rely on CDN originals (and browser caching) instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sove.pub.bucket.storage.yandexcloud.net",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
      },
      {
        protocol: "https",
        hostname: "sove.app",
      },
      {
        protocol: "http",
        hostname: "sove.app",
      },
    ],
  },
};

export default nextConfig;
