import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

let client: SupabaseClient<Database> | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true, // 세션 유지 활성화
        autoRefreshToken: true, // 토큰 자동 갱신 활성화
      },
    },
  )

  return client
}

function useCreateClient() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useCreateClient
