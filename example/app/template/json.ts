import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

type InputData = {
  body: {
    message: string
  }
}

export default {
  name: 'Run action with inputData parsed in JSON',
  description: 'Automation with run action with inputData parsed in JSON',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-typescript',
          requestBody: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            inputData: {
              body: '{{json trigger.body}}',
            },
            code: String(function (context: CodeContext<InputData>) {
              const { message } = context.inputData.body
              return { message }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
