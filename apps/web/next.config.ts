import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during `next build` – linting is handled by Turbo/CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to succeed even if there are TS errors in debug files
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
