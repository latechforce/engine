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
  name: 'Start with a Jotform connection',
  description: 'App with a Jotform connection',
  connections: [
    {
      id: 1,
      name: 'Jotform',
      service: 'jotform',
    },
  ],
} satisfies AppSchema
