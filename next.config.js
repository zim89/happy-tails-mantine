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

module.exports = nextConfig;
