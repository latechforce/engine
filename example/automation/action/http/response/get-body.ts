import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'response',
      trigger: {
        service: 'http',
        event: 'get',
        params: {
          path: 'response',
        },
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          params: {
            body: {
              message: 'Hello, world!',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
