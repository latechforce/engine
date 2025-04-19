import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithNotionReadPropertyIntegration: Config =
  {
    name: 'App with a run typescript action with a Notion integration with read property method',
    automations: [
      {
        name: 'readProperty',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-property',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            property: '{{runJavascriptCode.property}}',
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
              const page = await table.retrieve(id)
              if (!page) throw new Error('Page not found')
              const property: string | null = page.getTitle('name')
              return { property }
            }),
          },
        ],
      },
    ],
  }
