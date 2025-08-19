import type { AppSchema } from '@/types'
export * from './index'

export const inGuides = false

export default {
  name: 'Start with a LinkedIn connection',
  description: 'App with a LinkedIn connection',
  connections: [
    {
      id: 1,
      name: 'LinkedIn Ads',
      service: 'linkedin-ads',
      clientId: '{{env "LINKEDIN_CLIENT_ID" "client_id"}}',
      clientSecret: '{{{env "LINKEDIN_CLIENT_SECRET" "client_secret"}}}',
    },
  ],
} satisfies AppSchema
