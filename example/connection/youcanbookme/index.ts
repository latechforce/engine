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
  name: 'Start with a YouCanBookMe connection',
  description: 'App with a YouCanBookMe connection',
  connections: [
    {
      id: 1,
      name: 'YouCanBookMe',
      service: 'youcanbookme',
      baseUrl: '{{env.YOUCANBOOKME_BASE_URL "https://api.youcanbook.me"}}',
      username: '{{env.YOUCANBOOKME_USERNAME "mock-username"}}',
      password: '{{env.YOUCANBOOKME_PASSWORD "mock-password"}}',
    },
  ],
} satisfies AppSchema
