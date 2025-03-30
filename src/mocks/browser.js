import { kakaoAuthHandlers } from '@/entities/auth'
import { setupWorker } from 'msw/browser'

export const handlers = [...kakaoAuthHandlers]

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers)

worker.start()

export default worker
