import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP GET request',
  description: 'Automation with HTTP GET trigger',
  automations: [
    {
      id: 1,
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        params: {
          path: 'get',
        },
      },
      actions: [],
    },
  ],
} satisfies AppSchema
