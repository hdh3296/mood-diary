/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel에서 이미지 최적화
  images: {
    domains: ['localhost'],
  },
  // 빌드 최적화
  swcMinify: true,
  // 정적 내보내기 설정
  output: 'standalone',
  // 실험적 기능 활성화
  experimental: {
    // 서버 컴포넌트에서 클라이언트 컴포넌트로의 전환을 부드럽게
    appDir: true,
    serverActions: true,
  },
};

export default nextConfig;
