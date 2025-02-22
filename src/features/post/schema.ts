import { z } from 'zod'

const categorySchema = z.string({
  required_error: '카테고리를 선택해주세요',
})

const packageSchema = z.enum(['repository', 'project'], {
  errorMap: () => ({ message: '저장소 또는 프로젝트를 선택해주세요' }),
})

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(20, '제목은 20자 이내로 입력해주세요'),

  category: categorySchema,
  package: packageSchema,
})

export type PostFormValues = z.infer<typeof postFormSchema>
