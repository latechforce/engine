import { z } from 'zod/v4'

export const basehttpTriggerValidator = z
  .object({
    service: z.literal('http'),
  })
  .strict()
