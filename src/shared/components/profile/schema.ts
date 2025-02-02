import { z } from 'zod'

const socialAccountsSchema = z
  .array(
    z.object({
      url: z.string().refine((value) => {
        if (!value) return true

        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      }, '올바른 URL 형식이 아닙니다'),
    }),
  )
  .optional()
export const profileSchema = z.object({
  username: z.string().min(2, '이름은 2글자 이상이어야 합니다'),
  nickname: z.string().min(2, '닉네임은 2글자 이상이어야 합니다').nullable(),
  bio: z.string().optional(),
  location: z.string().optional(),
  display_email: z.string().email('올바른 이메일 형식이 아닙니다').nullable(),
  social_accounts: socialAccountsSchema,
})

export type ProfileFormSchema = z.infer<typeof profileSchema>
