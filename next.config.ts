import type { NextConfig } from 'next';

const adminPathPattern = '^/admin(?:/.*)?$';

const nextConfig: NextConfig = {
  // x-robots-tag:
  async headers() {
    return [
      // Apply X-Robots-Tag to all non-admin routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow', // or noindex, follow — your choice
          },
        ],
        has: [
          {
            type: 'host',
            value: '(.*)', // match all hosts
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-nextjs-skip-header', // fallback trick, not needed unless you're overriding
          },
        ],
      },
      // Exclude admin route explicitly
      {
        source: adminPathPattern,
        headers: [], // no X-Robots-Tag here
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
