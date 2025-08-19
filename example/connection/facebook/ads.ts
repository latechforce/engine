import type { AppSchema } from '@/types'
export * from './index'

export const inGuides = false

export default {
  name: 'Start with a Facebook Ads connection',
  description: 'App with a Facebook Ads connection',
  connections: [
    {
      id: 1,
      name: 'Facebook Ads',
      service: 'facebook-ads',
      clientId: '{{env "FACEBOOK_CLIENT_ID" "client_id"}}',
      clientSecret: '{{env "FACEBOOK_CLIENT_SECRET" "client_secret"}}',
    },
  ],
} satisfies AppSchema
