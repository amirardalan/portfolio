import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/resume',
        destination: process.env.RESUME_URL!,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        // Account Avatars
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        // CMS Media Gallery
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ['next-mdx-remote'],
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
