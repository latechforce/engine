import type { AppSchema, CodeContext } from '@/types'

export default {
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
