import type { Handlers } from 'script/mock'

export const handlers: Handlers = {
  'https://oauth2.googleapis.com/token': {
    POST: () => ({
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
    GET: () => ({
      json: {
        data: { email: 'mock@google.com' },
      },
    }),
  },
}
