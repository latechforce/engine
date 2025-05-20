import { z } from 'zod'
import { automationValidator } from './automation.validator'
import { tableValidator } from './table.validator'

export const appValidator = z
  .object({
    name: z.string().trim().min(3).default('App name'),
    version: z.string().trim().min(1).default('0.0.1'),
    description: z.string().trim().min(1).default('App description'),
    automations: z.array(automationValidator).default([]),
    tables: z.array(tableValidator).default([]),
  })
  .strict()

export type AppSchema = z.infer<typeof appValidator>
