const CONFIG = {
  // 필수 : 웹앱 이름을 적어주세요.
  appName: 'jungsik.jeong_blog',
  // 필수 : 앱 설명 (SEO 태그에 사용됨. 덮어쓸 수 있음)
  appDescription: '정중식의 블로그입니다.',
  // 필수입력 (https:// 빼고 도메인만 입력. 끝에 /도 빼야 함. ex) yoursite.com
  domainName: process.env.NEXT_PUBLIC_DOMAIN_NAME || 'http://localhost:3000',
  supportEmail: 'wndtlr1024@gmail.com',
  auth: {
    // 필수 - 로그인 경로. 개인 경로 보호 및 401 오류 처리에 사용
    loginUrl: '/login',
    // 필수 — 로그인 성공 후 리다이렉트될 개인 페이지 경로지정 (지금은 '/' 로 되어있지만, /dashboard 로 지정해줄수도있음)
    callbackUrl: '/',
  },

  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || '',
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
    },
  },

  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}

export default CONFIG
