import { z } from 'zod/v4'

export const baseIntegrationTriggerValidator = z
  .object({
    connection: z.union([z.number(), z.string()]),
  })
  .strict()
