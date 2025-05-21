import type { AppSchema } from '@/types'

export default {
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
            const message: string = 'Hello world!'
            return { message }
          }),
        },
        {
          name: 'response',
          service: 'http',
          action: 'response',
          body: {
            message: '{{ runTypescriptCode.message }}',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
