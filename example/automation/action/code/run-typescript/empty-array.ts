import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

export default {
  name: 'Run TypeScript code action with empty array',
  description: 'Automation with run TypeScript code action with empty array',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypeScriptCode',
          params: {
            code: String(function () {
              return []
            }),
          },
        },
        {
          service: 'code',
          action: 'run-typescript',
          name: 'buildMessage',
          params: {
            inputData: {
              name: '{{runTypeScriptCode.name}}',
            },
            code: String(function (context: CodeContext<{ name: string }>) {
              const { name } = context.inputData
              return {
                message: `Hello, ${name}!`,
              }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
