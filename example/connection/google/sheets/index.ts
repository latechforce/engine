import type { AppSchema, Mock } from '@/types'

export const inGuides = false

export const mock: Mock = {
  '/oauth/token': {
    POST: () => ({
      json: {},
    }),
  },
}

export default {
  name: 'Start with a Google Sheets connection',
  description: 'App with a Google Sheets connection',
  connections: [
    {
      id: 1,
      name: 'Google Sheets',
      service: 'google-sheets',
      clientId: '{{env "GOOGLE_SHEETS_CLIENT_ID"}}',
      clientSecret: '{{env "GOOGLE_SHEETS_CLIENT_SECRET"}}',
    },
  ],
} satisfies AppSchema
