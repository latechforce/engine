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
  name: 'Start with a LinkedIn Ads connection',
  description: 'App with a LinkedIn Ads connection',
  connections: [
    {
      id: 1,
      name: 'LinkedIn Ads',
      service: 'linkedin-ads',
      clientId: '{{env "LINKEDIN_ADS_CLIENT_ID"}}',
      clientSecret: '{{env "LINKEDIN_ADS_CLIENT_SECRET"}}',
    },
  ],
} satisfies AppSchema
