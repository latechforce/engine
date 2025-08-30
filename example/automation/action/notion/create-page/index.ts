import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { createPageResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'Create Notion page',
  description: 'Automation with a Notion create page action',
  automations: [
    {
      id: 1,
      name: 'create-page',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/create-page',
        },
      },
      actions: [
        {
          name: 'create-page',
          account: 'Notion',
          service: 'notion',
          action: 'create-page',
          params: {
            parent: {
              type: 'database_id',
              database_id: 'mock-database-id',
            },
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: 'Test Page',
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  ],
  connections: notionConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...notionHandlers,
  'https://api.notion.com/v1/pages': {
    POST: async () => ({
      json: createPageResponse,
    }),
  },
}