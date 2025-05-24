import { z } from 'zod/v4'

export const baseCalendlyTriggerValidator = z
  .object({
    service: z.literal('calendly'),
  })
  .strict()
