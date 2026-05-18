import type { NextConfig } from "next";

const indexNowKey = process.env.INDEXNOW_KEY?.trim();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.chairradar.com"
          }
        ],
        destination: "https://chairradar.com/:path*",
        permanent: true
      }
    ];
  },
  async rewrites() {
    if (!indexNowKey) {
      return [];
    }

    return [
      {
        source: `/${indexNowKey}.txt`,
        destination: "/api/indexnow/key"
      }
    ];
  }
};

export default nextConfig;
