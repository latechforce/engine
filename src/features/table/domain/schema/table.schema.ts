// Third-party imports
import { z } from 'zod/v4'
import pkg from '../../../../../package.json'

// Table domain imports
import { fieldSchema } from './field'

export const tableSchema = z
  .object({
    id: z
      .number()
      .int()
      .positive()
      .describe('Unique identifier for the table')
      .meta({
        title: 'Table ID',
        readOnly: true,
        examples: [1, 2, 100],
      }),
    name: z
      .string()
      .trim()
      .min(1)
      .describe('Name of the database table')
      .meta({
        title: 'Table Name',
        placeholder: 'Enter table name',
        examples: ['users', 'products', 'orders', 'customers'],
        pattern: '^[a-z][a-z0-9_]*$',
        help: 'Use lowercase letters, numbers, and underscores. Must start with a letter.',
      }),
    fields: z
      .array(fieldSchema)
      .default([])
      .describe('List of fields/columns in this table')
      .meta({
        title: 'Table Fields',
        minItems: 1,
        uiSchema: {
          'ui:ArrayFieldTemplate': 'collapsible',
          'ui:options': { orderable: true, removable: true, addable: true },
        },
      }),
  })
  .strict()
  .meta({
    title: 'Data Table',
    description: 'A database table definition with its fields and structure',
    version: pkg.version,
  })

export type TableSchema = z.infer<typeof tableSchema>
