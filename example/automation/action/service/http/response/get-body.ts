import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      name: 'response',
      trigger: {
        service: 'http',
        event: 'get',
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
