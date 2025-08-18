import type { AppSchema } from '@/types'
import type { Handlers } from '@/script/mock'

export const inGuides = false

export default {
  name: 'Start with a LinkedIn connection',
  description: 'App with a LinkedIn connection',
  connections: [
    {
      id: 1,
      name: 'LinkedIn',
      service: 'linkedin',
      clientId: '{{env "LINKEDIN_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "LINKEDIN_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema

export const handlers: Handlers = {
  'https://www.linkedin.com/oauth/v2/accessToken': {
    POST: async () => ({
      json: {
        access_token: 'mock-token',
        expires_in: 3600,
      },
    }),
  },
  'https://api.linkedin.com/v2/me': {
    GET: async () => ({
      json: { id: 'urn:li:person:000000' },
    }),
  },
  'https://api.linkedin.com/v2/emailAddress': {
    GET: async () => ({
      json: { elements: [{ handle: { emailAddress: 'test@test.com' } }] },
    }),
  },
}
