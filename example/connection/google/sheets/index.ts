import type { AppSchema } from '@/types'
export * from '../index'

export const inGuides = false

export default {
  name: 'Start with a Google Sheets connection',
  description: 'App with a Google Sheets connection',
  connections: [
    {
      id: 1,
      name: 'Google Sheets',
      service: 'google-sheets',
      clientId: '{{env "GOOGLE_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "GOOGLE_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema
