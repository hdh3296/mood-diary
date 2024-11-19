/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel에서 이미지 최적화
  images: {
    domains: ['localhost'],
  },
  // 빌드 최적화
  swcMinify: true,
  // 환경 변수 설정
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  analytics: true,
};

export default nextConfig;
