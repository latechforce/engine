import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'HTTP response action with static body',
  description: 'Automation with HTTP response action and static body',
  automations: [
    {
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'response',
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
