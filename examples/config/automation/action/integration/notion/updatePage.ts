import type { Config } from '/src'
import {
  notionTableSample1,
  notionTableSample3,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

export const configAutomationActionIntegrationNotionUpdatePage: Config = {
  name: 'App with Notion integration with UpdatePage action',
  automations: [
    {
      name: 'updatePage',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'update-page',
        input: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
        },
      },
      actions: [
        {
          name: 'updatePage',
          integration: 'Notion',
          action: 'UpdatePage',
          account: 'notion',
          table: notionTableSample1.name,
          id: '{{trigger.body.id}}',
          page: {
            name: 'John Doe',
          },
        },
      ],
    },
  ],
}

export const configAutomationActionIntegrationNotionUpdatePageWithSpecialCharacters: Config = {
  name: 'App with Notion update page integration with special characters',
  automations: [
    {
      name: 'updatePage',
      trigger: {
        integration: 'Notion',
        event: 'TablePageCreated',
        table: notionTableSample3.name,
        account: 'notion',
      },
      actions: [
        {
          name: 'updatePage',
          integration: 'Notion',
          action: 'UpdatePage',
          table: notionTableSample3.name,
          id: '{{trigger.id}}',
          account: 'notion',
          page: {
            '[App] Nom': '{{lookup trigger.properties "[App] Nom" }} updated',
          },
        },
      ],
    },
  ],
}
