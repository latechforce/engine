import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtableInsertIntegration: Config = {
  name: 'Appwith a run typescript action with an Airtable integration with insert method',
  automations: [
    {
      name: 'createUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'create-user',
        input: {
          type: 'object',
          properties: {
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
            name: '{{trigger.body.name}}',
          },
          env: {
            TEST_AIRTABLE_TABLE_1_ID: '{{env.TEST_AIRTABLE_TABLE_1_ID}}',
          },
          code: String(async function (context: CodeRunnerContext<{ name: string }>) {
            const { inputData, integrations, env } = context
            const { name } = inputData
            const { airtable } = integrations
            const table = await airtable.getTable('airtable', env.TEST_AIRTABLE_TABLE_1_ID)
            const user = await table.insert({ name })
            return { user }
          }),
        },
      ],
    },
  ],
}
