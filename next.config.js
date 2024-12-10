const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  fallbacks: {
    document: '/~offline',
    image: 'images/no-signal.png',
  },
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Strict mode forces components render twice, it breaks some functionality
  reactStrictMode: false,
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      // FIXME: Only for development!
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

module.exports = withPWA(nextConfig);
