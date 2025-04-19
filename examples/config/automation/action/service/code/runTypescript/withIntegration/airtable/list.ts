import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtableListIntegration: Config = {
  name: 'App with a run typescript action with an Airtable integration with list method',
  automations: [
    {
      name: 'listUsers',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'list-users',
        input: {
          type: 'object',
          properties: {
            ids: { type: 'array', items: { type: 'string' } },
          },
        },
        output: {
          users: {
            json: '{{runJavascriptCode.users}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          input: {
            ids: {
              json: '{{trigger.body.ids}}',
            },
          },
          env: {
            TEST_AIRTABLE_TABLE_1_ID: '{{env.TEST_AIRTABLE_TABLE_1_ID}}',
          },
          code: String(async function (context: CodeRunnerContext<{ ids: string[] }>) {
            const { airtable } = context.integrations
            const { ids } = context.inputData
            type User = { name: string }
            const table = await airtable.getTable<User>(
              'airtable',
              context.env.TEST_AIRTABLE_TABLE_1_ID
            )
            const users = await table.list({
              field: 'id',
              operator: 'IsAnyOf',
              value: ids,
            })
            return { users }
          }),
        },
      ],
    },
  ],
}
