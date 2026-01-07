import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.alza.cz',
        pathname: '/Foto/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'image.alza.cz',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
