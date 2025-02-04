import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid'

interface IUploadFileParams {
  file: File
  newPath: string
  oldPath: string | null
  supabase: SupabaseClient
}

export const uploadFile = async ({
  file,
  newPath,
  oldPath,
  supabase,
}: IUploadFileParams) => {
  try {
    if (oldPath) {
      await supabase.storage.from('profile_image').remove([oldPath])
    }

    const { data, error } = await supabase.storage
      .from('profile_image')
      .upload(newPath, file)

    if (error) throw error

    return data.path.split('/').pop()
  } catch (error) {
    console.error('Error in uploadFile:', error)
    return null
  }
}
