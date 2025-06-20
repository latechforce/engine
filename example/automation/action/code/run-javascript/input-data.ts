import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Run JavaScript code action with input data',
  description: 'Automation with run JavaScript code action and input data',
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-javascript',
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
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'params',
          params: {
            inputData: {
              name: '{{trigger.body.name}}',
            },
            // @ts-expect-error - CodeContext is not defined in the externals
            code: String(function (context) {
              const { name } = context.inputData
              const message: string = `Hello, ${name}!`
              return { message }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
