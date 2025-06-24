import { getCurrentUserResponse } from '@/e2e/__mocks__/calendly'
import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'

export const inGuides = false

export default {
  name: 'Start with a Calendly connection',
  description: 'App with a Calendly connection',
  connections: [
    {
      id: 1,
      name: 'Calendly',
      service: 'calendly',
      clientId: '{{env "CALENDLY_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "CALENDLY_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema

export const handlers: Handlers = {
  'https://auth.calendly.com/oauth/token': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        scope: 'default',
        created_at: new Date().getTime(),
      },
    }),
  },
  'https://api.calendly.com/users/me': {
    GET: async () => ({
      json: getCurrentUserResponse,
    }),
  },
}
