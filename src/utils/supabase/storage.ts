import { SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

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

export const uploadReadmeImageToStorage = async (
  file: File,
  folderPath: string,
  supabase: SupabaseClient,
): Promise<string> => {
  const response = await supabase.storage
    .from('readme')
    .upload(`${folderPath}/${uuidv4()}`, file, {
      contentType: 'image/jpg',
      upsert: true,
    })

  if (response.error) {
    throw new Error('이미지 업로드 실패: ' + response.error.message)
  }

  const { data } = supabase.storage
    .from('readme')
    .getPublicUrl(response.data.path)

  return data.publicUrl
}
