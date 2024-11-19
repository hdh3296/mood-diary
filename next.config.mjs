/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel에서 이미지 최적화
  images: {
    domains: ['localhost'],
  },
  // 빌드 최적화
  swcMinify: true,
  // 404 에러 로그 숨기기
  async rewrites() {
    return [
      {
        source: '/.well-known/vercel/microfrontend-routing',
        destination: '/api/microfrontend-routing',
      },
    ]
  },
};

export default nextConfig;
