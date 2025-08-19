import type { Handlers } from '@/script/mock'

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
