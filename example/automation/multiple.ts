import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Multiple automations',
  description: 'App with multiple automations',
  automations: [
    {
      id: 1,
      name: 'run-success',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-success',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            code: String(function () {
              const message: string = 'Hello, world!'
              return { message }
            }),
          },
        },
      ],
    },
    {
      id: 2,
      name: 'run-failure-automation',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-failure',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            code: String(function () {
              throw new Error('This is a failure')
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
