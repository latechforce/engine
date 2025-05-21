import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'HTTP GET trigger with immediate response',
  description: 'Automation with HTTP GET trigger with immediate response',
  automations: [
    {
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        path: 'get',
        respondImmediately: true,
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          body: {
            message: 'Hello, world!',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
