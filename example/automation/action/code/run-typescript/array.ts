import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

export default {
  name: 'Run TypeScript code action with array',
  description: 'Automation with run TypeScript code action with array',
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
              const list = [
                {
                  name: 'John Doe',
                },
                {
                  name: 'Jane Doe',
                },
                {
                  name: 'Jacob Doe',
                },
              ]
              return list
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
