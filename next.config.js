/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode forces components render twice, it breaks some of functionality
  reactStrictMode: false,
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

module.exports = nextConfig;
