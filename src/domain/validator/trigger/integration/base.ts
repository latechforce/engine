import { z } from 'zod/v4'

export const baseIntegrationTriggerValidator = z
  .object({
    account: z.union([z.number(), z.string()]),
  })
  .strict()
