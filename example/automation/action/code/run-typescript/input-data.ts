import type { AppSchema, CodeContext } from '@/types'

export const inGuides = true

export default {
  name: 'Run TypeScript code action with input data',
  description: 'Automation with run TypeScript code action and input data',
  automations: [
    {
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/run-typescript',
        requestBody: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          inputData: {
            name: '{{trigger.body.name}}',
          },
          code: String(function (context: CodeContext<{ name: string }>) {
            const { name } = context.inputData
            const message: string = `Hello, ${name}!`
            return { message }
          }),
        },
      ],
    },
  ],
} satisfies AppSchema
