import type { AppSchema } from '@/types'

export default {
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
