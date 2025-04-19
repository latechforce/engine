import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithNotionCreateIntegration: Config = {
  name: 'App with a run typescript action with a Notion integration with create method',
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
            TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
          },
          code: String(async function (context: CodeRunnerContext<{ name: string }>) {
            const { inputData, integrations, env } = context
            const { name } = inputData
            const { notion } = integrations
            const table = await notion.getTable('notion', env.TEST_NOTION_TABLE_1_ID)
            const user = await table.insert({ name })
            return { user }
          }),
        },
      ],
    },
  ],
}
