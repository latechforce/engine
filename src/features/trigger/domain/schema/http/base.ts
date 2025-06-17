import { z } from 'zod/v4'

export const basehttpTriggerSchema = z
  .object({
    service: z.literal('http'),
  })
  .strict()
