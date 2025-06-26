import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'

export const inGuides = false

export default {
  name: 'Start with a Airtable connection',
  description: 'App with a Airtable connection',
  connections: [
    {
      id: 1,
      name: 'Airtable',
      service: 'airtable',
      clientId: '{{env "AIRTABLE_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "AIRTABLE_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema

export const handlers: Handlers = {
  'https://airtable.com/oauth2/v1/token': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        scope: 'default',
        created_at: new Date().getTime(),
      },
    }),
  },
  'https://api.airtable.com/v0/meta/whoami': {
    GET: async () => ({
      json: {
        id: 'mock-user-id',
        email: 'mock@airtable.com',
      },
    }),
  },
}
