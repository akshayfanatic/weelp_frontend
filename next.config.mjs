/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.29.153',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // useSkewCookie
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;
