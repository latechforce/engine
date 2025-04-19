import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtableReadFieldIntegration: Config =
  {
    name: 'App with a run typescript action with an Airtable integration with read field method',
    automations: [
      {
        name: 'readField',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-field',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            field: '{{runJavascriptCode.field}}',
          },
        },
        actions: [
          {
            service: 'Code',
            action: 'RunTypescript',
            name: 'runJavascriptCode',
            input: {
              id: '{{trigger.body.id}}',
            },
            env: {
              TEST_AIRTABLE_TABLE_1_ID: '{{env.TEST_AIRTABLE_TABLE_1_ID}}',
            },
            code: String(async function (context: CodeRunnerContext<{ id: string }>) {
              const { inputData, integrations, env } = context
              const { airtable } = integrations
              const { id } = inputData
              const table = await airtable.getTable('airtable', env.TEST_AIRTABLE_TABLE_1_ID)
              const record = await table.retrieve(id)
              if (!record) throw new Error('Record not found')
              const field: string | null = record.getSingleLineText('name')
              return { field }
            }),
          },
        ],
      },
    ],
  }
