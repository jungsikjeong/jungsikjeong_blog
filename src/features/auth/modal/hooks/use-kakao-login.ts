import { kakaoApi } from '@/entities/auth'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useKakaoLogin = () => {
  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationFn: kakaoApi.getAuthCode,
    onSuccess: (data) => {
      console.log('성공', data)
      toast.success('블로그 세계에 오신것을 환영합니다.')
    },
    onError: (error: Error) => {
      if (error.message === 'Network Error') {
        console.error('네트워크 에러', error)
        toast.error('네트워크 에러', {
          description: '잠시후 다시 실행해주세요',
        })
      } else {
        console.error('카카오 로그인 실패', error)
        toast.error('카카오 로그인 실패', {
          description: '잠시후 다시 실행해주세요',
        })
      }
    },
  })

  return { mutate, isLoading: isPending, isSuccess, reset, data }
}
