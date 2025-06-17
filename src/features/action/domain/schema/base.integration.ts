import { z } from 'zod/v4'
import { baseActionSchema } from './base'

export const baseIntegrationActionSchema = baseActionSchema
  .extend({
    account: z.union([z.number(), z.string()]),
  })
  .strict()
