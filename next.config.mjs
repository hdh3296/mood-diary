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
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
};

export default nextConfig;
