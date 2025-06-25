import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // x-robots-tag:
  async headers() {
    return [
      {
        // Match all routes EXCEPT those starting with /admin
        source: '/((?!admin).*)', // negative lookahead
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
  /* config options here */
  transpilePackages: ['three'],
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
};

export default nextConfig;
