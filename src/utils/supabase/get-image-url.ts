type ImageStorageType = 'master' | 'user' | 'product'

export const getStorageImageUrl = (
  imageUrl: string | null | undefined,
  type: ImageStorageType = 'master',
  defaultImage: string = '/images/no-avatar.png',
): string => {
  if (!imageUrl) {
    return defaultImage
  }

  if (imageUrl.includes('kakaocdn.net')) {
    return imageUrl
  }

  const storageUrls = {
    master: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PROFILE_MASTER_URL,
    user: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PROFILE_USER_URL,
    product: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PRODUCT_URL,
  }

  return `${storageUrls[type]}/${imageUrl}`
}
