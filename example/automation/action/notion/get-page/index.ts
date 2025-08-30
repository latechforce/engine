import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { getPageResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'Get Notion page',
  description: 'Automation with a Notion get page action',
  automations: [
    {
      id: 2,
      name: 'get-page',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/get-page',
        },
      },
      actions: [
        {
          name: 'get-page',
          account: 'Notion',
          service: 'notion',
          action: 'get-page',
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
    GET: async () => ({
      json: getPageResponse,
    }),
  },
}