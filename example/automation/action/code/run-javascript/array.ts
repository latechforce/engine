import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

export default {
  name: 'Run JavaScript code action with array',
  description: 'Automation with run JavaScript code action with array',
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavaScriptCode',
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
          action: 'run-javascript',
          name: 'buildMessage',
          params: {
            inputData: {
              name: '{{runJavaScriptCode.name}}',
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
