import { z } from 'zod/v4'

export const baseScheduleTriggerSchema = z
  .object({
    service: z.literal('schedule'),
  })
  .strict()
