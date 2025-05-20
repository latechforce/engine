import type { AppSchema } from '@/types'

export const previousErrorResponseHttpAction: AppSchema = {
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
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          code: String(async function () {
            throw new Error('This is a test error')
          }),
        },
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
}
