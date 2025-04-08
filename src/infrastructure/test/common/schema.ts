import type { AutomationSchema } from '/adapter/api/schemas/AutomationSchema'
import type { BucketSchema } from '../../../adapter/api/schemas/BucketSchema'
import type { ConfigSchema } from '/adapter/api/schemas/ConfigSchema'
import type { TableSchema } from '/adapter/api/schemas/TableSchema'

const fullSchema: ConfigSchema = {
  name: 'App',
  version: '1.0.0',
  engine: '1.0.0',
  automations: [
    {
      name: 'ApiCalled',
      summary: 'Trigger an automation',
      description: 'This automation is triggered when an API is called',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
      },
      actions: [],
    },
    {
      name: 'ApiCalledWithApiKeyAuth',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
        auth: 'ApiKey',
      },
      actions: [],
    },
    {
      name: 'ApiCalledWithReturnedValue',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
        output: {
          value: 'hello',
        },
      },
      actions: [],
    },
    {
      name: 'ApiCalledWithError',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
      },
      actions: [
        {
          name: 'throwError',
          service: 'Code',
          action: 'RunJavascript',
          code: String(function () {
            throw new Error('Test error')
          }),
        },
      ],
    },
    {
      name: 'ApiCalledWithSingleLineTextInput',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
        input: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
            },
          },
          required: ['text'],
        },
      },
      actions: [],
    },
    {
      name: 'WebhookCalled',
      trigger: {
        service: 'Http',
        event: 'WebhookCalled',
        path: 'run',
      },
      actions: [],
    },
    {
      name: 'WebhookCalledWithApiKeyAuth',
      trigger: {
        service: 'Http',
        event: 'WebhookCalled',
        path: 'run',
        auth: 'ApiKey',
      },
      actions: [],
    },
    {
      name: 'FirstDatabaseTableRecordCreated',
      trigger: {
        service: 'Database',
        event: 'RecordCreated',
        table: 'first_table',
      },
      actions: [],
    },
    {
      name: 'FirstNotionTablePageCreated',
      trigger: {
        integration: 'Notion',
        event: 'TablePageCreated',
        table: 'first_table',
        account: 'notion',
      },
      actions: [],
    },
    {
      name: 'CronTimeTicked',
      trigger: {
        service: 'Schedule',
        event: 'CronTimeTicked',
        cronTime: '*/2 * * * * *',
      },
      actions: [],
    },
    {
      name: 'CalendlyInviteeCreated',
      trigger: {
        integration: 'Calendly',
        event: 'InviteeCreated',
        account: 'calendly',
      },
      actions: [],
    },
    {
      name: 'YouCanBookMeBookingCreated',
      trigger: {
        integration: 'YouCanBookMe',
        event: 'BookingCreated',
      },
      actions: [],
    },
  ],
  tables: [
    {
      name: 'first_table',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'name_before_migration',
          type: 'SingleLineText',
        },
        {
          name: 'name_after_migration',
          type: 'SingleLineText',
          onMigration: {
            replace: 'name_before_migration',
          },
        },
        {
          name: 'long_text',
          type: 'LongText',
        },
        {
          name: 'date',
          type: 'DateTime',
        },
        {
          name: 'checkbox',
          type: 'Checkbox',
        },
        {
          name: 'number',
          type: 'Number',
        },
        {
          name: 'number_formula',
          type: 'Formula',
          formula: 'number * 10',
          output: {
            type: 'Number',
          },
        },
        {
          name: 'number_formula_reference',
          type: 'Formula',
          formula: 'number_formula * 10',
          output: {
            type: 'Number',
          },
        },
        {
          name: 'text_formula',
          type: 'Formula',
          formula: "'Hello ' || name",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'text_formula_reference',
          type: 'Formula',
          formula: "text_formula || '!'",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'single_select',
          type: 'SingleSelect',
          options: ['Red', 'Blue', 'Green'],
        },
        {
          name: 'multiple_select',
          type: 'MultipleSelect',
          options: ['Red', 'Blue', 'Green'],
        },
        {
          name: 'single_linked_record',
          type: 'SingleLinkedRecord',
          table: 'second_table',
        },
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'second_table',
        },
        {
          name: 'text_rollup',
          type: 'Rollup',
          multipleLinkedRecord: 'multiple_linked_record',
          linkedRecordField: 'name',
          formula: "CONCAT(values, ', ')",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'single_attachment',
          type: 'SingleAttachment',
        },
        {
          name: 'multiple_attachment',
          type: 'MultipleAttachment',
        },
        {
          name: 'number_rollup',
          type: 'Rollup',
          multipleLinkedRecord: 'multiple_linked_record',
          linkedRecordField: 'number',
          formula: 'SUM(values)',
          output: {
            type: 'Number',
          },
        },
        {
          name: 'Champs avec charactères (spéciaux)',
          type: 'SingleLineText',
        },
        {
          name: 'email',
          type: 'Email',
        },
        {
          name: 'url',
          type: 'Url',
        },
      ],
    },
    {
      name: 'second_table',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'number',
          type: 'Number',
        },
      ],
    },
  ],
  buckets: [
    {
      name: 'first_bucket',
    },
  ],
}

type AutomationName =
  | 'ApiCalled'
  | 'ApiCalledWithApiKeyAuth'
  | 'ApiCalledWithReturnedValue'
  | 'ApiCalledWithError'
  | 'ApiCalledWithSingleLineTextInput'
  | 'FirstDatabaseTableRecordCreated'
  | 'FirstNotionTablePageCreated'
  | 'WebhookCalled'
  | 'WebhookCalledWithApiKeyAuth'
  | 'CronTimeTicked'
  | 'CalendlyInviteeCreated'
  | 'YouCanBookMeBookingCreated'

type FirstTableFieldName =
  | 'name'
  | 'name_before_migration'
  | 'name_after_migration'
  | 'long_text'
  | 'date'
  | 'checkbox'
  | 'number'
  | 'number_formula'
  | 'number_formula_reference'
  | 'text_formula'
  | 'text_formula_reference'
  | 'single_select'
  | 'multiple_select'
  | 'single_attachment'
  | 'multiple_attachment'
  | 'single_linked_record'
  | 'multiple_linked_record'
  | 'text_rollup'
  | 'number_rollup'
  | 'email'
  | 'url'
  | 'Champs avec charactères (spéciaux)'

export function getFirstTableSchema(fields: FirstTableFieldName[] = ['name']): {
  name: string
  version: string
  engine: string
  tables: TableSchema[]
} {
  const firstTable = fullSchema.tables?.find((table) => table.name === 'first_table')
  if (!firstTable) {
    throw new Error('First Table not found')
  }
  return {
    name: 'First Table',
    version: '1.0.0',
    engine: '1.0.0',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
    ],
  }
}

export function getFirstAndSecondTableSchema(fields: FirstTableFieldName[] = ['name']): {
  name: string
  version: string
  engine: string
  tables: TableSchema[]
} {
  const firstTable = fullSchema.tables?.find((table) => table.name === 'first_table')
  const secondTable = fullSchema.tables?.find((table) => table.name === 'second_table')
  if (!firstTable || !secondTable) {
    throw new Error('First or Second Table not found')
  }
  return {
    name: 'First and Second Table',
    version: '1.0.0',
    engine: '1.0.0',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
      secondTable,
    ],
  }
}

export function getFirstBucketSchema(): {
  name: string
  version: string
  engine: string
  buckets: BucketSchema[]
} {
  const firstBucket = fullSchema.buckets?.find((bucket) => bucket.name === 'first_bucket')
  if (!firstBucket) {
    throw new Error('First Bucket not found')
  }
  return {
    name: 'First Bucket',
    version: '1.0.0',
    engine: '1.0.0',
    buckets: [firstBucket],
  }
}

export function getAutomationSchema(name: AutomationName): {
  name: string
  version: string
  engine: string
  automations: AutomationSchema[]
  services: {
    server: {
      apiKeys: string[]
    }
  }
} {
  const automation = fullSchema.automations?.find((automation) => automation.name === name)
  if (!automation) {
    throw new Error('Automation not found')
  }
  return {
    name,
    version: '1.0.0',
    engine: '1.0.0',
    automations: [automation],
    services: {
      server: {
        apiKeys: ['test-key'],
      },
    },
  }
}
