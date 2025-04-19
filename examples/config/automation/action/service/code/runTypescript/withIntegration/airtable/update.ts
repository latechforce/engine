import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtableUpdateIntegration: Config = {
  name: 'App with a run typescript action with an Airtable integration with update method',
  automations: [
    {
      name: 'updateUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'update-user',
        input: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
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
            name: '{{trigger.body.name}}',
          },
          env: {
            TEST_AIRTABLE_TABLE_1_ID: '{{env.TEST_AIRTABLE_TABLE_1_ID}}',
          },
          code: String(async function (context: CodeRunnerContext<{ id: string; name: string }>) {
            const { inputData, integrations, env } = context
            const { name, id } = inputData
            const { airtable } = integrations
            const table = await airtable.getTable('airtable', env.TEST_AIRTABLE_TABLE_1_ID)
            const user = await table.update(id, { name })
            return { user }
          }),
        },
      ],
    },
  ],
}
