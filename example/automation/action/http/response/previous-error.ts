import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'response',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            code: String(async function () {
              throw new Error('This is a test error')
            }),
          },
        },
        {
          name: 'response',
          service: 'http',
          action: 'response',
          responseHttp: {
            body: {
              message: 'Hello, world!',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
