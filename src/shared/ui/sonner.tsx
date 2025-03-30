'use client'

import {
  ExternalToast,
  toast as sonnerToast,
  Toaster as SonnerToaster,
} from 'sonner'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type ToastProps = React.ComponentProps<typeof SonnerToaster>

export function Toaster({ ...props }: ToastProps) {
  return (
    <SonnerToaster
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          success:
            'group-[.toaster]:!bg-green-50 group-[.toaster]:!border-green-200 group-[.toaster]:!text-green-800',
          error:
            'group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-200 group-[.toaster]:!text-red-800',
          warning:
            'group-[.toaster]:!bg-yellow-50 group-[.toaster]:!border-yellow-200 group-[.toaster]:!text-yellow-800',

          info: 'group-[.toaster]:!bg-blue-50 group-[.toaster]:!border-blue-200 group-[.toaster]:!text-blue-800',
          title: 'group-[.toast]:text-foreground group-[.toast]:font-semibold',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

// 커스텀 아이콘이 있는 토스트 함수
export const toast = {
  ...sonnerToast,
  success: (message: string, options: ExternalToast | undefined) => {
    return sonnerToast.success(message, {
      ...options,
      icon: <CheckCircle className='h-5 w-5 text-green-500' />,
    })
  },
  error: (message: string, options: ExternalToast | undefined) => {
    return sonnerToast.error(message, {
      ...options,
      icon: <AlertCircle className='h-5 w-5 text-red-500' />,
    })
  },
  warning: (message: string, options: ExternalToast | undefined) => {
    return sonnerToast.warning(message, {
      ...options,
      icon: <AlertTriangle className='h-5 w-5 text-yellow-500' />,
    })
  },
  info: (message: string, options: ExternalToast | undefined) => {
    return sonnerToast.info(message, {
      ...options,
      icon: <Info className='h-5 w-5 text-blue-500' />,
    })
  },
}
