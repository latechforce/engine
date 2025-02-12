import type { Config } from '/domain/interfaces'
import type { IAutomation } from '/domain/interfaces/IAutomation'
import type { IBucket } from '/domain/interfaces/IBucket'
import type { ITable } from '/domain/interfaces/ITable'

const fullConfig: Config = {
  name: 'App',
  version: '1.0.0',
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
      name: 'ApiCalledWithTextInput',
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
  | 'ApiCalledWithTextInput'
  | 'FirstTableRecordCreated'
  | 'WebhookCalled'
  | 'WebhookCalledWithApiKeyAuth'

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
  | 'multiple_attachment'
  | 'single_linked_record'
  | 'multiple_linked_record'
  | 'text_rollup'
  | 'number_rollup'

export function getFirstTableConfig(fields: FirstTableFieldName[] = ['name']): {
  name: string
  version: string
  tables: ITable[]
} {
  const firstTable = fullConfig.tables?.find((table) => table.name === 'first_table')
  if (!firstTable) {
    throw new Error('First Table not found')
  }
  return {
    name: 'First Table',
    version: '1.0.0',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
    ],
  }
}

export function getFirstAndSecondTableConfig(fields: FirstTableFieldName[] = ['name']): {
  name: string
  version: string
  tables: ITable[]
} {
  const firstTable = fullConfig.tables?.find((table) => table.name === 'first_table')
  const secondTable = fullConfig.tables?.find((table) => table.name === 'second_table')
  if (!firstTable || !secondTable) {
    throw new Error('First or Second Table not found')
  }
  return {
    name: 'First and Second Table',
    version: '1.0.0',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
      secondTable,
    ],
  }
}

export function getFirstBucketConfig(): {
  name: string
  version: string
  buckets: IBucket[]
} {
  const firstBucket = fullConfig.buckets?.find((bucket) => bucket.name === 'first_bucket')
  if (!firstBucket) {
    throw new Error('First Bucket not found')
  }
  return {
    name: 'First Bucket',
    version: '1.0.0',
    buckets: [firstBucket],
  }
}

export function getAutomationConfig(name: AutomationName): {
  name: string
  version: string
  automations: IAutomation[]
  server: {
    apiKeys: string[]
  }
} {
  const automation = fullConfig.automations?.find((automation) => automation.name === name)
  if (!automation) {
    throw new Error('Automation not found')
  }
  return {
    name,
    version: '1.0.0',
    automations: [automation],
    server: {
      apiKeys: ['test-key'],
    },
  }
}
