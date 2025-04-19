import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithNotionUpdateIntegration: Config = {
  name: 'App with a run typescript action with a Notion integration with update method',
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
            TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
          },
          code: String(async function (context: CodeRunnerContext<{ id: string; name: string }>) {
            const { inputData, integrations, env } = context
            const { name, id } = inputData
            const { notion } = integrations
            const table = await notion.getTable('notion', env.TEST_NOTION_TABLE_1_ID)
            const user = await table.update(id, { name })
            return { user }
          }),
        },
      ],
    },
  ],
}
