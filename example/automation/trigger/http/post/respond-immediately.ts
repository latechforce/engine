import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'HTTP POST trigger with immediate response',
  description: 'Automation with HTTP POST trigger and immediate response',
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
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
