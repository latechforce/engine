import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'response',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            code: String(async function () {
              throw new Error('This is a test error')
            }),
          },
        },
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
