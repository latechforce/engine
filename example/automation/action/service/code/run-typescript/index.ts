import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run TypeScript code action',
  description: 'Automation with run TypeScript code action',
  automations: [
    {
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/run-typescript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          code: String(function () {
            const message: string = 'Hello, world!'
            return { message }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
