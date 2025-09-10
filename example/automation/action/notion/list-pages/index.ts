import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { listPagesResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'List Notion pages',
  description: 'Automation with a Notion list pages action',
  automations: [
    {
      id: 5,
      name: 'list-pages',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/list-pages',
        },
      },
      actions: [
        {
          name: 'list-pages',
          account: 'Notion',
          service: 'notion',
          action: 'list-pages',
          params: {
            databaseId: 'mock-database-id',
            pageSize: 10,
          },
        },
      ],
    },
  ],
  connections: notionConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...notionHandlers,
  'https://api.notion.com/v1/databases/mock-database-id/query': {
    POST: async () => ({
      json: listPagesResponse,
    }),
  },
}
