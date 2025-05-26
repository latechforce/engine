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
    },
  ],
} satisfies AppSchema
