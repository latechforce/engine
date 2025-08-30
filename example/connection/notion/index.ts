import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'

export const inGuides = false

export default {
  name: 'Start with a Notion connection',
  description: 'App with a Notion connection',
  connections: [
    {
      id: 1,
      name: 'Notion',
      service: 'notion',
      clientId: '{{env "NOTION_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "NOTION_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema

export const handlers: Handlers = {
  'https://api.notion.com/v1/oauth/token': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'bearer',
        bot_id: 'mock-bot-id',
        workspace_id: 'mock-workspace-id',
        workspace_name: 'Mock Workspace',
        workspace_icon: null,
        owner: {
          type: 'user',
          user: {
            id: 'mock-user-id',
            object: 'user',
            name: 'Mock User',
            avatar_url: null,
            type: 'person',
            person: {
              email: 'mock@notion.com',
            },
          },
        },
        duplicated_template_id: null,
      },
    }),
  },
  'https://api.notion.com/v1/users/me': {
    GET: async () => ({
      json: {
        object: 'user',
        id: 'mock-user-id',
        name: 'Mock User',
        avatar_url: null,
        type: 'person',
        person: {
          email: 'mock@notion.com',
        },
      },
    }),
  },
}