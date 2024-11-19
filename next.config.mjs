/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel에서 이미지 최적화
  images: {
    domains: ['localhost'],
  },
  // 빌드 최적화
  swcMinify: true,
};

export default nextConfig;
