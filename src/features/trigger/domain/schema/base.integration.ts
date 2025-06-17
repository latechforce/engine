// Third-party imports
import { z } from 'zod/v4'

export const baseIntegrationTriggerSchema = z
  .object({
    account: z.union([z.number(), z.string()]),
  })
  .strict()
