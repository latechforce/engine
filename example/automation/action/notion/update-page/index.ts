import type { AppSchema } from '@/types'
import notionConnection from '@/example/connection/notion'
import type { Handlers } from '@/script/mock'
import { handlers as notionHandlers } from '../../../../connection/notion'
import { updatePageResponse } from '@/e2e/__mocks__/notion'

export const inGuides = false

export default {
  name: 'Update Notion page',
  description: 'Automation with a Notion update page action',
  automations: [
    {
      id: 3,
      name: 'update-page',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/update-page',
        },
      },
      actions: [
        {
          name: 'update-page',
          account: 'Notion',
          service: 'notion',
          action: 'update-page',
          params: {
            pageId: 'mock-page-id',
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: 'Updated Page Title',
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
  'https://api.notion.com/v1/pages/mock-page-id': {
    PATCH: async () => ({
      json: updatePageResponse,
    }),
  },
}
