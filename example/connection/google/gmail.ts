import type { AppSchema } from '@/types'
export * from './index'

export const inGuides = false

export default {
  name: 'Start with a Gmail connection',
  description: 'App with a Gmail connection',
  connections: [
    {
      id: 1,
      name: 'Gmail',
      service: 'google-gmail',
      clientId: '{{env "GOOGLE_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "GOOGLE_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema
