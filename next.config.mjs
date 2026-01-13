/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ini yang bikin warning ESLint tidak memblokir build/deploy
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;