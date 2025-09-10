import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { deletePageResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'Delete Notion page',
  description: 'Automation with a Notion delete page action',
  automations: [
    {
      id: 4,
      name: 'delete-page',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/delete-page',
        },
      },
      actions: [
        {
          name: 'delete-page',
          account: 'Notion',
          service: 'notion',
          action: 'delete-page',
          params: {
            pageId: 'mock-page-id',
          },
        },
      ],
    },
  ],
  connections: notionConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...notionHandlers,
  'https://api.notion.com/v1/pages/mock-page-id': {
    PATCH: async () => ({
      json: deletePageResponse,
    }),
  },
}
