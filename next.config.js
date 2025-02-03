/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
      },
    ],
    domains: [
      'fjkwqglelzrzrspnfunt.supabase.co',
      'k.kakaocdn.net',
      'img1.kakaocdn.net',
    ],
  },
}

module.exports = nextConfig
