import type { NextConfig } from 'next';

const imageHostname = process.env.R2_PUBLIC_DOMAIN ?? 'localhost';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: imageHostname,
      },
    ],
  },
};

export default nextConfig;
