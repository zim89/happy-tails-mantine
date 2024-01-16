/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.petco.com',
        port: '',
        pathname: '/petco/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'image.chewy.com',
        port: '',
        pathname: '/is/image/catalog/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/s/files/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

module.exports = nextConfig;
