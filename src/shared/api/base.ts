import axios from 'axios'

export const baseAPI = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true, // 요청에 쿠키를 포함시킴
})

baseAPI.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

baseAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: 인증 실패 처리 (로그인 페이지로 리다이렉트 등)
    }
    return Promise.reject(error)
  },
)
