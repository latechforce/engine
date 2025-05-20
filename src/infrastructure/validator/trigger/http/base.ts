import { z } from 'zod'

export const basehttpTriggerValidator = z
  .object({
    service: z.literal('http'),
  })
  .strict()
