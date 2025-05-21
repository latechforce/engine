import { z } from 'zod/v4'
import { automationValidator } from './automation.validator'
import { tableValidator } from './table.validator'

export const appValidator = z
  .object({
    name: z.string().trim().min(3).default('My fantastic app'),
    version: z.string().trim().min(1).default('0.0.1'),
    description: z.string().trim().min(1).default('My fantastic app description'),
    automations: z.array(automationValidator).default([]),
    tables: z.array(tableValidator).default([]),
  })
  .strict()
  .meta({
    title: 'App',
  })

export type AppSchema = z.infer<typeof appValidator>
