import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithNotionListIntegration: Config = {
  name: 'App with a run typescript action with a Notion integration with list method',
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
            TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
          },
          code: String(async function (context: CodeRunnerContext<{ ids: string[] }>) {
            const { notion } = context.integrations
            const { ids } = context.inputData
            type User = { name: string }
            const table = await notion.getTable<User>('notion', context.env.TEST_NOTION_TABLE_1_ID)
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
