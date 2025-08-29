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
    automations: z
      .array(automationSchema)
      .default([])
      .describe('List of automation workflows that define business logic and integrations')
      .meta({
        title: 'Automations',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
    tables: z
      .array(tableSchema)
      .default([])
      .describe('Database tables that store your application data')
      .meta({
        title: 'Data Tables',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
    forms: z
      .array(formSchema)
      .default([])
      .describe('User interface forms for data collection and interaction')
      .meta({
        title: 'Forms',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
    connections: z
      .array(connectionSchema)
      .default([])
      .describe('External service connections and API integrations')
      .meta({
        title: 'Connections',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
    buckets: z
      .array(bucketSchema)
      .default([])
      .describe('Storage buckets for files and media assets')
      .meta({
        title: 'Storage Buckets',
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
  })
  .strict()
  .meta({
    title: 'Application Configuration',
    description:
      'Complete configuration for your application including metadata, data models, automations, and integrations',
    version: pkg.version,
  })

export type AppSchemaValidated = z.infer<typeof appSchema>
export type AppSchema = Partial<AppSchemaValidated>
