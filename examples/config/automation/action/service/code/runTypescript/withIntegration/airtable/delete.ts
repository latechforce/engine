import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtableDeleteIntegration: Config = {
  name: 'App with a run typescript action with an Airtable integration with delete method',
  automations: [
    {
      name: 'deleteUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'delete-user',
        input: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        output: {
          user: {
            json: '{{runJavascriptCode.user}}',
          },
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
            await table.delete(id)
            const user = await table.retrieve(id)
            return { user }
          }),
        },
      ],
    },
  ],
}
