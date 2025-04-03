/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**", // Allow all images from this domain
      },
    ],
  },
};

export default nextConfig;
