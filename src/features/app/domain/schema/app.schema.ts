import { z } from 'zod/v4'
import { automationSchema } from '../../../automation/domain/schema/automation.schema'
import { tableSchema } from '../../../table/domain/schema/table.schema'
import { connectionSchema } from '../../../connection/domain/schema/connection.schema'
import { formSchema } from '../../../form/domain/schema/form.schema'
import { bucketSchema } from '../../../bucket/domain/schema/bucket.schema'

export const appSchema = z
  .object({
    name: z.string().trim().min(3).default('My app'),
    version: z.string().trim().min(1).default('1.0.0'),
    description: z.string().trim().min(1).default('My app description'),
    automations: z.array(automationSchema).default([]),
    tables: z.array(tableSchema).default([]),
    forms: z.array(formSchema).default([]),
    connections: z.array(connectionSchema).default([]),
    buckets: z.array(bucketSchema).default([]),
  })
  .strict()
  .meta({
    title: 'App',
  })

export type AppSchemaValidated = z.infer<typeof appSchema>
export type AppSchema = Partial<AppSchemaValidated>
