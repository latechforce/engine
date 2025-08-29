import { z } from 'zod/v4'
import pkg from 'package.json'

import { automationSchema } from '../../../automation/domain/schema/automation.schema'
import { tableSchema } from '../../../table/domain/schema/table.schema'
import { connectionSchema } from '../../../../shared/integrations/core/connection.schema'
import { formSchema } from '../../../form/domain/schema/form.schema'
import { bucketSchema } from '../../../bucket/domain/schema/bucket.schema'
import { metadataSchema } from './metadata.schema'

export const appSchema = metadataSchema
  .extend({
    automations: z.array(automationSchema).default([]),
    tables: z.array(tableSchema).default([]),
    forms: z.array(formSchema).default([]),
    connections: z.array(connectionSchema).default([]),
    buckets: z.array(bucketSchema).default([]),
  })
  .strict()
  .meta({
    title: 'App',
    version: pkg.version,
  })

export type AppSchemaValidated = z.infer<typeof appSchema>
export type AppSchema = Partial<AppSchemaValidated>
