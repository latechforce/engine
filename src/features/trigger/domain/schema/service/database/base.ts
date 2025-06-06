import { z } from 'zod/v4'

export const baseDatabaseTriggerSchema = z
  .object({
    service: z.literal('database'),
  })
  .strict()
