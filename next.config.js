/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'standalone',
  // reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: { missingSuspenseWithCSRBailout: false },
  transpilePackages: ['ui'],
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
