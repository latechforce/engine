import type { Handlers } from '@/script/mock'

export const handlers: Handlers = {
  'https://oauth2.googleapis.com/token': {
    POST: async () => ({
      json: {
        tokens: {
          access_token: 'mock-token',
          token_type: 'Bearer',
          expiry_date: new Date().getTime() + 3600 * 1000,
          refresh_token: 'mock-refresh-token',
          scope: 'default',
          created_at: new Date().getTime(),
        },
      },
    }),
  },
  'https://www.googleapis.com/oauth2/v2/userinfo': {
    GET: async () => ({
      json: {
        data: { email: 'mock@google.com' },
      },
    }),
  },
  'https://www.googleapis.com/gmail/v1/users/me/profile': {
    GET: async () => ({
      json: {
        data: { emailAddress: 'mock@google.com' },
      },
    }),
  },
}
