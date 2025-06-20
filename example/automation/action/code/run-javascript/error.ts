import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'params',
          params: {
            code: String(function () {
              throw new Error('This is a test error')
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
