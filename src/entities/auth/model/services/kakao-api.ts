import { baseAPI } from '@/shared/api'
import { http, HttpResponse } from 'msw'

export const kakaoAuthHandlers = [
  http.get('/api/auth/kakao', () => {
    return HttpResponse.json({
      redirectUrl: `https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code`,
    })
  }),

  http.get('/api/auth/kakao/callback', async ({ request }) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) {
      return new HttpResponse('인증 코드가 없습니다.', { status: 400 })
    }

    return HttpResponse.json({
      access_token: 'mock_kakao_access_token',
      token_type: 'bearer',
      refresh_token: 'mock_kakao_refresh_token',
      expires_in: 21599,
      scope: 'profile_nickname profile_image account_email birthday gender',
      refresh_token_expires_in: 5184000,
    })
  }),

  http.post('/api/auth/kakao/logout', () => {
    return HttpResponse.json({
      success: true,
      message: '로그아웃되었습니다.',
    })
  }),
]

export const kakaoApi = {
  getAuthCode: async () => await baseAPI.get('/auth/kakao'),
  handleCallback: (code: string) =>
    fetch(`/api/auth/kakao/callback?code=${code}`).then((res) => res.json()),
  logout: () =>
    fetch('/api/auth/kakao/logout', { method: 'POST' }).then((res) =>
      res.json(),
    ),
}
