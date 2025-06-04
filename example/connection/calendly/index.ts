import type { AppSchema, Mock } from '@/types'

export const inGuides = false

export const mock: Mock = {
  '/oauth/token': {
    POST: () => ({
      json: {
        access_token: 'mock-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        scope: 'default',
        created_at: 1716633078,
      },
    }),
  },
  '/users/me': {
    GET: () => ({ json: { resource: { email: 'mock@calendly.com' } } }),
  },
}

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
