import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const uploadFile = async (
  file: File,
  path: string,
  supabase: SupabaseClient,
) => {
  const { data, error } = await supabase.storage
    .from('profile_image')
    .upload(path, file, { upsert: true })

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  return data
}
