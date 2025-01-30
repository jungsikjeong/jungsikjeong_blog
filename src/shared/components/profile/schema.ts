import { z } from 'zod'

export const socialAccountsSchema = z.array(z.string().url())

export const profileSchema = z.object({
  username: z.string().min(2, '이름은 2글자 이상이어야 합니다'),
  nickname: z.string().min(2, '닉네임은 2글자 이상이어야 합니다').optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  social_accounts: z.array(
    z.object({
      url: z.string().url().optional(),
    }),
  ),
})

export type SocialAccountsType = z.infer<typeof socialAccountsSchema>
export type ProfileFormSchema = z.infer<typeof profileSchema>
