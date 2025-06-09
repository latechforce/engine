import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

type InputData = {
  amount: number
}

export default {
  name: 'Run action with inputData parsed in number',
  description: 'Automation with run action with inputData parsed in number',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'run-typescript',
          requestBody: {
            type: 'object',
            properties: {
              amount: { type: 'number' },
            },
            required: ['amount'],
            additionalProperties: false,
          },
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            inputData: {
              amount: '{{number trigger.body.amount}}',
            },
            code: String(function (context: CodeContext<InputData>) {
              const { amount } = context.inputData
              return { amount }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
