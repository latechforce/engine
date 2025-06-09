import type { AppSchema, CodeContext } from '@/types'

export const inGuides = true

export default {
  name: 'Run TypeScript code action with log',
  description: 'Automation with run TypeScript code action with log',
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
            code: String(function (context: CodeContext) {
              context.log.info('Hello, world!')
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
