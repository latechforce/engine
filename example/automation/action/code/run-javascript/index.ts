import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run JavaScript code action',
  description: 'Automation with run JavaScript code action',
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
              const message = 'Hello, world!'
              return { message }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
