import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run TypeScript code action',
  description: 'Automation with run TypeScript code action',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: '/run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            code: String(function () {
              const message: string = 'Hello, world!'
              return { message }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
