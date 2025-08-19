import type { Handlers } from '@/script/mock'

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
  'https://api.linkedin.com/v2/userinfo': {
    GET: async () => ({
      json: { email: 'test@test.com' },
    }),
  },
}
