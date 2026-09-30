/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore ESLint errors during the build process
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during the build process
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
