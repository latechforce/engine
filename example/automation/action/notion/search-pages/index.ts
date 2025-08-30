import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { searchPagesResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'Search Notion pages',
  description: 'Automation with a Notion search pages action',
  automations: [
    {
      id: 6,
      name: 'search-pages',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/search-pages',
        },
      },
      actions: [
        {
          name: 'search-pages',
          account: 'Notion',
          service: 'notion',
          action: 'search-pages',
          params: {
            query: 'test',
          },
        },
      ],
    },
  ],
  connections: notionConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...notionHandlers,
  'https://api.notion.com/v1/search': {
    POST: async () => ({
      json: searchPagesResponse,
    }),
  },
}