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
  name: 'Start with a Facebook Lead Ads connection',
  description: 'App with a Facebook Lead Ads connection',
  connections: [
    {
      id: 1,
      name: 'Facebook Lead Ads',
      service: 'facebook-lead-ads',
    },
  ],
} satisfies AppSchema
