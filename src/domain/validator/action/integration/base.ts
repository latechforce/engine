import { z } from 'zod/v4'
import { baseActionValidator } from '../base'

export const baseIntegrationActionValidator = baseActionValidator
  .extend({
    account: z.union([z.number(), z.string()]),
  })
  .strict()
