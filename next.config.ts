import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bmwgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bmw.com',
      },
      {
        protocol: 'https',
        hostname: 'gesrepair.com',
      }
    ],
  },
};

export default nextConfig;
