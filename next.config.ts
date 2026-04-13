import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sove.pub.bucket.storage.yandexcloud.net",
      },
    ],
  },
};

export default nextConfig;
