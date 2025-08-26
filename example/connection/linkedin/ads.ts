import type { AppSchema } from '@/types'
export * from './index'

export const inGuides = false

export default {
  name: 'Start with a LinkedIn Ads connection',
  description: 'App with a LinkedIn Ads connection',
  connections: [
    {
      id: 1,
      name: 'LinkedIn Ads',
      service: 'linkedin-ads',
      clientId: 'client_id',
      clientSecret: 'client_secret',
    },
  ],
} satisfies AppSchema
