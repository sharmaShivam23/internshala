/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'internshala.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
