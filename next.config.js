/** @type {import('next').NextConfig} */
const nextConfig = {
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
