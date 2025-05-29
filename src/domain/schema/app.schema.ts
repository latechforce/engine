import { z } from 'zod/v4'
import { automationValidator } from './automation.schema'
import { tableValidator } from './table.schema'
import { connectionValidator } from './connection'
import { formValidator } from './form.schema'

export const appValidator = z
  .object({
    name: z.string().trim().min(3).default('My app'),
    version: z.string().trim().min(1).default('1.0.0'),
    description: z.string().trim().min(1).default('My app description'),
    automations: z.array(automationValidator).default([]),
    tables: z.array(tableValidator).default([]),
    forms: z.array(formValidator).default([]),
    connections: z.array(connectionValidator).default([]),
  })
  .strict()
  .meta({
    title: 'App',
  })

export type AppSchemaValidated = z.infer<typeof appValidator>
export type AppSchema = Partial<AppSchemaValidated>
