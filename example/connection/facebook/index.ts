import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'

export const inGuides = false

export default {
  name: 'Start with a Facebook connection',
  description: 'App with a Facebook connection',
  connections: [
    {
      id: 1,
      name: 'Facebook',
      service: 'facebook',
      clientId: '{{env "FACEBOOK_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "FACEBOOK_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema

export const handlers: Handlers = {
  'https://graph.facebook.com/v23.0/oauth/access_token': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }),
  },
  'https://graph.facebook.com/v23.0/me': {
    GET: async () => ({
      json: { id: '123' },
    }),
  },
}
