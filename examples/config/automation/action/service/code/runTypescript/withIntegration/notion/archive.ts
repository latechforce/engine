import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithNotionArchiveIntegration: Config = {
  name: 'App with a run typescript action with a Notion integration with archive method',
  automations: [
    {
      name: 'readUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'read-user',
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
            TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
          },
          code: String(async function (context: CodeRunnerContext<{ id: string }>) {
            const { inputData, integrations, env } = context
            const { notion } = integrations
            const { id } = inputData
            const table = await notion.getTable('notion', env.TEST_NOTION_TABLE_1_ID)
            await table.archive(id)
            const user = await table.retrieve(id)
            return { user }
          }),
        },
      ],
    },
  ],
}
